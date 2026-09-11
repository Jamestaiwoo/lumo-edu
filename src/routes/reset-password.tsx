import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LumoLogo } from "@/components/LumoLogo";
import { Disclaimer } from "@/components/Disclaimer";
import { ErrorBanner, InlineSpinner } from "@/components/state/StateViews";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a new password — Lumo" },
      { name: "description", content: "Choose a new password for your Lumo account and get back to learning." },
      { property: "og:title", content: "Set a new password — Lumo" },
      { property: "og:description", content: "Choose a new password for your Lumo account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const hash = window.location.hash ?? "";
    const isRecovery = hash.includes("type=recovery");

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (session && isRecovery)) setReady(true);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else if (!isRecovery)
        setLinkError("This reset link is invalid or has expired. Request a new one from the sign-in page.");
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError(new Error("Use at least 6 characters."));
      return;
    }
    if (password !== confirm) {
      setError(new Error("Both passwords must match."));
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      toast.success("Password updated. You're signed in.");
      navigate({ to: "/home", replace: true });
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-5 py-10">
        <LumoLogo className="size-14" showName />
        <div>
          <h1 className="text-3xl font-bold">Set a new password</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose something you'll remember.</p>
        </div>

        {linkError ? (
          <div className="surface rounded-2xl border border-border/60 p-5 text-sm">
            <p className="font-semibold">Link no longer valid</p>
            <p className="mt-1 text-muted-foreground">{linkError}</p>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => navigate({ to: "/auth" })}>
              Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat it"
              />
            </div>
            <ErrorBanner error={error} />
            <Button type="submit" disabled={busy} className="mt-2 h-12 font-bold">
              {busy ? <InlineSpinner label="Saving…" /> : "Save new password"}
            </Button>
            {!ready && (
              <p className="text-xs text-muted-foreground">Checking your reset link…</p>
            )}
          </form>
        )}

        <Disclaimer />
      </div>
    </div>
  );
}
