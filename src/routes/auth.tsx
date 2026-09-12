import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LumoLogo } from "@/components/LumoLogo";
import { ErrorBanner, InlineSpinner } from "@/components/state/StateViews";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Lumo" },
      { name: "description", content: "Create your free Lumo account and start learning trading fundamentals." },
      { property: "og:title", content: "Sign in — Lumo" },
      { property: "og:description", content: "Create your free Lumo account and start learning trading fundamentals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [sent, setSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/home", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        navigate({ to: "/home", replace: true });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setResetSent(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (err) throw err;
        setResetSent(true);
        toast.success("Reset link sent — check your email.");
      } else if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (err) throw err;
        if (!data.session) {
          setSent(true);
          toast.success("Check your email to confirm your account.");
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  async function resendConfirmation() {
    if (!email) {
      setError(new Error("Enter your email address first."));
      return;
    }
    setResending(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: window.location.origin },
      });
      if (err) throw err;
      toast.success("Confirmation email sent again.");
    } catch (err) {
      setError(err);
    } finally {
      setResending(false);
    }
  }

  async function google() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(new Error("Google sign-in failed. Try email instead."));
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/home", replace: true });
  }

  const heading =
    mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset your password" : "Welcome back";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-5 py-10">
        <LumoLogo className="size-14" showName />
        <div>
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "forgot"
              ? "We'll email you a link to choose a new one."
              : "Learn trading. One decision at a time."}
          </p>
        </div>

        {sent ? (
          <div className="surface rounded-2xl border border-border/60 p-5 text-sm">
            <p className="font-semibold">Confirm your email</p>
            <p className="mt-1 text-muted-foreground">
              We sent a link to {email}. Open it to activate your account, then come back and sign in.
            </p>
            <ErrorBanner error={error} />
            <Button
              className="mt-4 w-full"
              variant="secondary"
              disabled={resending}
              onClick={resendConfirmation}
            >
              {resending ? <InlineSpinner label="Sending…" /> : "Resend confirmation email"}
            </Button>
            <Button
              className="mt-2 w-full"
              variant="outline"
              onClick={() => {
                setSent(false);
                switchMode("signin");
              }}
            >
              Back to sign in
            </Button>
          </div>
        ) : resetSent ? (
          <div className="surface rounded-2xl border border-border/60 p-5 text-sm">
            <p className="font-semibold">Check your email</p>
            <p className="mt-1 text-muted-foreground">
              If an account exists for {email}, a reset link is on its way. The link expires after a short while.
            </p>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => switchMode("signin")}>
              Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Display name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>
            )}

            <ErrorBanner error={error} />

            <Button type="submit" disabled={busy} className="mt-2 h-12 font-bold">
              {busy ? (
                <InlineSpinner label="Please wait…" />
              ) : mode === "signup" ? (
                "Create account"
              ) : mode === "forgot" ? (
                "Send reset link"
              ) : (
                "Sign in"
              )}
            </Button>

            {mode === "signin" && (
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  className="text-muted-foreground underline-offset-4 hover:underline"
                  onClick={() => switchMode("forgot")}
                >
                  Forgot your password?
                </button>
                <button
                  type="button"
                  className="text-muted-foreground underline-offset-4 hover:underline disabled:opacity-60"
                  disabled={resending}
                  onClick={resendConfirmation}
                >
                  {resending ? "Sending…" : "Resend confirmation"}
                </button>
              </div>
            )}
            {mode === "forgot" && (
              <button
                type="button"
                className="text-left text-xs text-muted-foreground underline-offset-4 hover:underline"
                onClick={() => switchMode("signin")}
              >
                Back to sign in
              </button>
            )}
          </form>
        )}

        {mode !== "forgot" && !sent && !resetSent && (
          <>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>

            <Button variant="outline" className="h-12" onClick={google}>
              Continue with Google
            </Button>

            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => switchMode(mode === "signup" ? "signin" : "signup")}
            >
              {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
            </button>
          </>
        )}

        <Disclaimer />
      </div>
    </div>
  );
}
