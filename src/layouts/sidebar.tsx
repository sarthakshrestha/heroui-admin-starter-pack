import {
  Link,
  Avatar,
  Chip,
} from "@heroui/react";
import {
  House,
  Layers,
  ListUl,
  ChartBar,
  Gear,
  CircleQuestion,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

import ThemeSwitcher from "@/components/theme-switcher";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <House />, href: "/" },
  { id: "orders", label: "Orders", icon: <Layers />, href: "/orders" },
  { id: "tracker", label: "Tracker", icon: <ListUl />, href: "/tracker", isNew: true },
  { id: "analytics", label: "Analytics", icon: <ChartBar />, href: "/analytics" },
  { id: "settings", label: "Settings", icon: <Gear />, href: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Sidebar Header - Profile Section */}
      <div className="flex items-center gap-3 px-6 py-10">
        <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-foreground text-background">
          <Avatar className="h-full w-full">
            <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg" />
          </Avatar>
        </div>
        <div className="flex flex-col min-w-0 overflow-hidden">
          <span className="text-sm font-interact text-primary-text truncate tracking-tight">Kate Moore</span>
          <span className="text-[11px] text-quaternary-text font-announce uppercase tracking-widest">Admin</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 text-sm">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center px-4 py-2 rounded-lg text-secondary-text hover:text-brand hover:bg-foreground/5 transition-all group no-underline"
            >
              <div className="flex items-center gap-3">
                <span className="text-tertiary-text group-hover:text-brand transition-colors flex items-center justify-center w-5 h-5">
                  {item.icon}
                </span>
                <span className="font-interact tracking-tight">{item.label}</span>
                {item.isNew && (
                  <Chip size="sm" variant="soft" className="ml-1 h-5 px-2 font-interact text-[10px] bg-brand-light text-brand-deep rounded-full border-none">
                    New
                  </Chip>
                )}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto p-4 flex flex-col gap-1 border-t border-divider/5">
        <Link
          href="/help"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-tertiary-text hover:text-primary-text transition-all no-underline"
        >
          <CircleQuestion width={16} className="text-quaternary-text" />
          <span className="font-interact tracking-tight">Help & Information</span>
        </Link>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-tertiary-text hover:text-red-500 transition-all text-left"
        >
          <ArrowRightFromSquare width={16} className="text-quaternary-text" />
          <span className="font-interact tracking-tight">Log out</span>
        </button>
      </div>
    </div>
  );
}

