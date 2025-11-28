import { Home, PlusCircle, MessageCircle, Zap, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/create", icon: PlusCircle, label: "Create" },
  { to: "/messages", icon: MessageCircle, label: "Messages" },
  { to: "/proposals", icon: Zap, label: "Proposals" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around md:justify-center md:gap-8 h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
              activeClassName="text-primary bg-primary/10"
            >
              <item.icon className="w-5 h-5 transition-all" />
              <span className="text-xs md:text-sm font-medium">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
