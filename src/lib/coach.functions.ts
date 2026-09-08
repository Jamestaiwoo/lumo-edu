import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the TradeLingo Coach, a patient trading *educator* for complete beginners.
Rules you must always follow:
- You teach concepts (risk, position sizing, order types, chart structure, psychology). You never give financial or investment advice.
- Never recommend buying or selling a specific asset, never predict prices, never promise or imply profits.
- If asked "should I buy X" or "will X go up", explain that you cannot advise, then teach the framework a learner would use to analyse it themselves.
- Refer to trading in TradeLingo as simulated paper trading with virtual money.
- Be concise: 2-4 short paragraphs or a tight bullet list. Use plain language, define jargon once.
- Encourage small risk, written plans and journaling.
Always end with one short follow-up question that pushes the learner to think.`;

export const askCoach = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { messages: Msg[]; context?: string }) => {
    if (!input || !Array.isArray(input.messages)) throw new Error("Invalid input");
    return {
      messages: input.messages.slice(-12).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content).slice(0, 2000),
      })) as Msg[],
      context: input.context ? String(input.context).slice(0, 800) : "",
    };
  })
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { reply: "The coach is not available right now. Please try again later." };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "google/gemini-3.8-flash",
        messages: [
          { role: "system", content: SYSTEM },
          ...(data.context ? [{ role: "system", content: `Learner context: ${data.context}` }] : []),
          ...data.messages,
        ],
      }),
    });

    if (res.status === 429) return { reply: "The coach is busy right now — give it a moment and ask again." };
    if (!res.ok) {
      console.error("coach error", res.status, await res.text());
      return { reply: "The coach could not answer that just now. Try rephrasing your question." };
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content ?? "No answer was returned. Try again." };
  });
