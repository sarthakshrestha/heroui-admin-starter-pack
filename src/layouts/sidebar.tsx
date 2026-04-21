import {
  Button,
  Link,
  Popover,
  Accordion,
  Avatar,
} from "@heroui/react";
import {
  House,
  Layers,
  ListUl,
  ChartBar,
  Person,
  ShieldCheck,
  Gear,
  Persons,
  Cpu,
  ChevronDown,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

import ThemeSwitcher from "@/components/theme-switcher";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <House />, href: "/" },
  { id: "orders", label: "Orders", icon: <Layers />, href: "/orders" },
  { id: "tasks", label: "Tasks", icon: <ListUl />, href: "/tasks" },
  { id: "reporting", label: "Reporting", icon: <ChartBar />, href: "/reporting" },
  { id: "users", label: "Users", icon: <Person />, href: "/users" },
  { id: "roles", label: "Roles", icon: <ShieldCheck />, href: "/roles" },
  {
    id: "customers",
    label: "Customers",
    icon: <Persons />,
    href: "/customers",
    children: [
      { label: "All Customers", href: "/customers" },
      { label: "Segments", href: "/customers/segments" },
    ],
  },
  { id: "settings", label: "Settings", icon: <Gear />, href: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col bg-content1 border-r border-divider">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-default-100 text-default-500 border border-default-200">
          <Cpu width={20} />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">
          Dashboard
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 text-sm">
        <div className="flex flex-col gap-1.5">
          {navItems
            .filter((item) => !item.children)
            .map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-default-500 hover:text-foreground hover:bg-default-100/80 transition-all group no-underline"
              >
                <span className="text-default-400 group-hover:text-primary transition-colors flex items-center justify-center w-5 h-5">
                  {item.icon}
                </span>
                <span className="font-semibold">{item.label}</span>
              </Link>
            ))}

          <Accordion className="px-0">
            {navItems
              .filter((item) => item.children)
              .map((item) => (
                <Accordion.Item
                  key={item.id}
                  id={item.id}
                  className="px-0"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="px-3.5 py-2.5 rounded-xl hover:bg-default-100/80 transition-all no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-default-400 flex items-center justify-center w-5 h-5">
                          {item.icon}
                        </span>
                        <span className="text-default-500 font-semibold">{item.label}</span>
                      </div>
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <div className="flex flex-col gap-1.5 pl-12 pr-2 pb-2 mt-1 border-l-2 border-default-100 ml-6">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="py-1.5 text-sm font-medium text-default-400 hover:text-primary transition-colors no-underline"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
      </nav>

      <div className="mt-auto p-4 flex flex-col gap-4 bg-default-50/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-default-400">Appearance</span>
          <ThemeSwitcher />
        </div>

        <Popover>
          <Popover.Trigger>
            <button className="flex w-full items-center gap-3 rounded-2xl p-2.5 hover:bg-default-100 transition-all text-left group">
              <Avatar className="h-11 w-11 ring-2 ring-transparent group-hover:ring-primary/20 transition-all shrink-0">
                <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar.Fallback className="bg-primary/10 text-primary">AU</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col items-start truncate overflow-hidden">
                <span className="text-sm font-bold text-foreground">Admin User</span>
                <span className="text-xs text-default-400 font-medium">admin@acme.com</span>
              </div>
              <div className="ml-auto flex items-center h-full">
                <ChevronDown className="text-default-300 group-hover:text-default-500 transition-colors" width={16} />
              </div>
            </button>
          </Popover.Trigger>
          <Popover.Content placement="top-start" offset={12} className="w-60 p-2 rounded-2xl shadow-2xl border border-divider">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                className="justify-start gap-3 h-11 font-medium text-danger hover:bg-danger/10 transition-colors rounded-xl"
              >
                <ArrowRightFromSquare width={18} />
                Sign Out
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}

