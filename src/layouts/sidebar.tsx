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
    <div className="flex flex-col h-screen w-full bg-[var(--color-background)] overflow-hidden border-none shadow-none">
      {/* Sidebar Header - Profile Section */}
      <div className="flex items-center gap-3 px-8 py-12">
        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-surface-featured text-background">
          <Avatar className="h-full w-full rounded-lg">
            <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg" />
          </Avatar>
        </div>
        <div className="flex flex-col min-w-0 overflow-hidden">
          <span className="text-base font-display font-medium text-primary-text truncate">Kate Moore</span>
          <span className="text-[10px] text-tertiary-text font-medium uppercase tracking-[0.05em]">Premium</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <div className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center px-8 py-3.5 text-secondary-text hover:text-primary-text hover:bg-surface-featured transition-all group no-underline border-none"
            >
              <div className="flex items-center gap-4 w-full">
                <span className="text-tertiary-text group-hover:text-primary-text transition-colors flex items-center justify-center w-5 h-5">
                  {item.icon}
                </span>
                <span className="font-display font-medium tracking-tight flex-1">{item.label}</span>
                {item.isNew && (
                  <Chip size="sm" variant="flat" className="h-5 px-2 font-display font-medium text-[10px] bg-revolut-blue text-white rounded-full border-none">
                    New
                  </Chip>
                )}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto py-6 flex flex-col gap-1 mb-2">
        <div className="px-8 mb-6">
          <ThemeSwitcher />
        </div>
        
        <Link
          href="/help"
          className="flex items-center gap-4 px-8 py-3 text-tertiary-text hover:text-primary-text hover:bg-surface-featured transition-all no-underline"
        >
          <CircleQuestion width={20} className="text-tertiary-text" />
          <span className="font-display font-medium tracking-tight">Help & Support</span>
        </Link>
        <button
          className="flex items-center gap-4 px-8 py-3 text-tertiary-text hover:text-revolut-danger hover:bg-revolut-danger/5 transition-all text-left w-full border-none"
        >
          <ArrowRightFromSquare width={20} />
          <span className="font-display font-medium tracking-tight">Sign out</span>
        </button>
      </div>
    </div>
  );
}



