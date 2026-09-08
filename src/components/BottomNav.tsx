import { Link } from "@tanstack/react-router";
import { Home, GraduationCap, Dumbbell, Bot, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/learn", label: "Learn", icon: GraduationCap },
  { to: "/practice", label: "Practice", icon: Dumbbell },
  { to: "/coach", label: "Coach", icon: Bot },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors data-[status=active]:text-primary"
            activeOptions={{ exact: false }}
          >
            <Icon className="size-5 transition-transform group-active:scale-90" aria-hidden />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
