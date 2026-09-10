import type { ReactNode } from "react";
import { AlertTriangle, Inbox, Loader2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingState({ label = "Loading…", rows = 3 }: { label?: string; rows?: number }) {
  return (
    <div className="flex flex-col gap-3" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-2xl border border-border/50 bg-card/60" />
      ))}
    </div>
  );
}

export function InlineSpinner({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <Loader2 className="size-3.5 animate-spin" aria-hidden />
      {label}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border p-6 text-center">
      <Inbox className="size-5 text-muted-foreground" aria-hidden />
      <p className="text-sm font-semibold">{title}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}

function messageOf(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error ?? "");
  if (/unauthorized|jwt|session/i.test(raw)) return "Your session expired. Please sign in again.";
  if (/fetch|network/i.test(raw)) return "We couldn't reach the server. Check your connection.";
  return raw || "Something went wrong.";
}

export function ErrorState({
  error,
  onRetry,
  title = "We couldn't load this",
}: {
  error: unknown;
  onRetry?: () => void;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
        <AlertTriangle className="size-4" aria-hidden />
        {title}
      </div>
      <p className="text-xs text-muted-foreground">{messageOf(error)}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" className="mt-1 h-8 text-xs" onClick={onRetry}>
          <RotateCw className="mr-1.5 size-3.5" aria-hidden />
          Retry
        </Button>
      )}
    </div>
  );
}

export function ErrorBanner({ error }: { error: unknown }) {
  if (!error) return null;
  return (
    <p className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
      <AlertTriangle className="mt-px size-3.5 shrink-0" aria-hidden />
      <span>{messageOf(error)}</span>
    </p>
  );
}

/** Standard loading / error / empty handling around a react-query result. */
export function QueryBoundary<T>({
  query,
  children,
  loadingRows,
  empty,
  isEmpty,
}: {
  query: { data: T | undefined; isPending: boolean; isError: boolean; error: unknown; refetch: () => void };
  children: (data: T) => ReactNode;
  loadingRows?: number;
  empty?: ReactNode;
  isEmpty?: (data: T) => boolean;
}) {
  if (query.isPending) return <LoadingState rows={loadingRows} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;
  const data = query.data as T;
  if (empty && isEmpty?.(data)) return <>{empty}</>;
  return <>{children(data)}</>;
}
