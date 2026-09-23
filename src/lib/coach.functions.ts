import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { TOPIC_LABELS } from "@/content/curriculum";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the Lumo Coach, a patient trading educator for complete beginners.
Rules you must always follow:
- You teach concepts (risk, position sizing, order types, chart structure, psychology). You never give financial or investment advice.
- Never recommend buying or selling a specific asset, never predict prices, never promise or imply profits.
- If asked "should I buy X" or "will X go up", explain that you cannot advise, then teach the framework a learner would use to analyse it themselves.
- Refer to trading in Lumo as simulated paper trading with virtual money.
- Use the learner's Lumo progress when it is provided. Correctly distinguish completed lessons, weak topics, recent mistakes, and paper-trading activity.
- Be concise: 2-4 short paragraphs or a tight bullet list. Use plain language and define jargon once.
- Encourage small risk, written plans and journaling.
Always end with one short follow-up question that pushes the learner to think.`;

function normalizeMessages(messages: Msg[]) {
  return messages
    .slice(-12)
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).trim().slice(0, 2000),
    }))
    .filter((m) => m.content.length > 0) as Msg[];
}

async function learnerContext(supabase: Awaited<ReturnType<typeof requireSupabaseAuth>> extends never ? never : any, userId: string) {
  const [profileResult, progressResult, attemptsResult, tradesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("experience_level, goal, xp, level, streak_count")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("lesson_progress")
      .select("lesson_id, completed, best_score, total_questions, attempts, updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(50),
    supabase
      .from("question_attempts")
      .select("topic, correct, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(300),
    supabase
      .from("paper_trades")
      .select("status, pnl, side, opened_at")
      .eq("user_id", userId)
      .order("opened_at", { ascending: false })
      .limit(100),
  ]);

  if (profileResult.error) throw profileResult.error;
  if (progressResult.error) throw progressResult.error;
  if (attemptsResult.error) throw attemptsResult.error;
  if (tradesResult.error) throw tradesResult.error;

  const profile = profileResult.data;
  const progress = (progressResult.data ?? []) as {
    lesson_id: string;
    completed: boolean;
    best_score: number;
    total_questions: number;
    attempts: number;
    updated_at: string;
  }[];
  const attempts = (attemptsResult.data ?? []) as { topic: string; correct: boolean; created_at: string }[];
  const trades = (tradesResult.data ?? []) as { status: string; pnl: number | null; side: string; opened_at: string }[];

  const topicMap = new Map<string, { total: number; correct: number; recentWrong: number }>();
  for (const attempt of attempts) {
    const row = topicMap.get(attempt.topic) ?? { total: 0, correct: 0, recentWrong: 0 };
    row.total += 1;
    if (attempt.correct) row.correct += 1;
    if (!attempt.correct && row.recentWrong < 3) row.recentWrong += 1;
    topicMap.set(attempt.topic, row);
  }

  const mastery = [...topicMap.entries()]
    .map(([topic, value]) => ({
      topic: TOPIC_LABELS[topic] ?? topic,
      accuracy: Math.round((value.correct / value.total) * 100),
      attempts: value.total,
      recentWrong: value.recentWrong,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  const completedLessons = progress.filter((item) => item.completed).length;
  const latestLesson = progress[0]?.lesson_id ?? "none";
  const closedTrades = trades.filter((trade) => trade.status === "closed");
  const profitableClosedTrades = closedTrades.filter((trade) => (trade.pnl ?? 0) > 0).length;

  return [
    `Experience: ${profile?.experience_level ?? "beginner"}.`,
    `Goal: ${profile?.goal ?? "learn_basics"}.`,
    `Lumo progress: ${completedLessons} completed lessons, ${profile?.xp ?? 0} XP, level ${profile?.level ?? 1}, ${profile?.streak_count ?? 0}-day streak.`,
    `Most recently updated lesson: ${latestLesson}.`,
    mastery.length
      ? `Lowest topic performance: ${mastery.map((item) => `${item.topic} ${item.accuracy}% (${item.attempts} attempts, ${item.recentWrong} recent wrong)`).join("; ")}.`
      : "No question-attempt mastery data yet.",
    closedTrades.length
      ? `Paper trading: ${trades.length} trades recorded, ${closedTrades.length} closed, ${profitableClosedTrades} closed with positive simulated P&L.`
      : "Paper trading: no closed trades yet.",
  ].join(" ");
}

export const listCoachConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(() => undefined)
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("coach_conversations")
      .select("id, title, created_at, updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getCoachConversation = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string }) => {
    if (!input || typeof input.conversationId !== "string" || !input.conversationId) {
      throw new Error("Missing conversation");
    }
    return { conversationId: input.conversationId };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: conversation, error: conversationError } = await supabase
      .from("coach_conversations")
      .select("id, title, created_at, updated_at")
      .eq("id", data.conversationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (conversationError) throw new Error(conversationError.message);
    if (!conversation) throw new Error("Conversation not found.");

    const { data: messages, error: messagesError } = await supabase
      .from("coach_messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", conversation.id)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (messagesError) throw new Error(messagesError.message);
    return { conversation, messages: messages ?? [] };
  });

export const deleteCoachConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string }) => {
    if (!input || typeof input.conversationId !== "string" || !input.conversationId) {
      throw new Error("Missing conversation");
    }
    return { conversationId: input.conversationId };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("coach_conversations")
      .delete()
      .eq("id", data.conversationId)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { deleted: true };
  });

export const askCoach = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId?: string | null; messages: Msg[] }) => {
    if (!input || !Array.isArray(input.messages)) throw new Error("Invalid input");
    const messages = normalizeMessages(input.messages);
    if (!messages.length || messages[messages.length - 1]?.role !== "user") {
      throw new Error("A user message is required.");
    }
    return {
      conversationId: input.conversationId ? String(input.conversationId) : null,
      messages,
    };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const messages = data.messages;
    let conversationId = data.conversationId;

    if (conversationId) {
      const { data: existing, error } = await supabase
        .from("coach_conversations")
        .select("id")
        .eq("id", conversationId)
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!existing) throw new Error("Conversation not found.");
    } else {
      const firstUser = messages.find((message) => message.role === "user");
      const title = (firstUser?.content ?? "New conversation").slice(0, 80);
      const { data: created, error } = await supabase
        .from("coach_conversations")
        .insert({ user_id: userId, title })
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message ?? "Could not create conversation.");
      conversationId = created.id;
    }

    const userMessage = messages[messages.length - 1];
    const { error: saveUserError } = await supabase.from("coach_messages").insert({
      conversation_id: conversationId,
      user_id: userId,
      role: "user",
      content: userMessage.content,
    });
    if (saveUserError) throw new Error(saveUserError.message);

    const contextText = await learnerContext(supabase, userId);
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { conversationId, reply: "The coach is not available right now. Please try again later." };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "google/gemini-3.8-flash",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "system", content: `Learner context: ${contextText}` },
          ...messages,
        ],
      }),
    });

    if (res.status === 429) {
      return { conversationId, reply: "The coach is busy right now — give it a moment and ask again." };
    }
    if (!res.ok) {
      console.error("coach error", res.status, await res.text());
      return { conversationId, reply: "The coach could not answer that just now. Try rephrasing your question." };
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = json.choices?.[0]?.message?.content ?? "No answer was returned. Try again.";

    const { error: saveAssistantError } = await supabase.from("coach_messages").insert({
      conversation_id: conversationId,
      user_id: userId,
      role: "assistant",
      content: reply,
    });
    if (saveAssistantError) throw new Error(saveAssistantError.message);

    return { conversationId, reply };
  });
