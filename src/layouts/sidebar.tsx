import {
  Button,
  Separator,
  Link,
  Popover,
  Accordion,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import ThemeSwitcher from "@/components/theme-switcher";

const navItems = [
  { label: "Dashboard", icon: "solar:home-2-bold", href: "/" },
  { label: "Orders", icon: "solar:layers-bold", href: "/orders" },
  { label: "Tasks", icon: "solar:check-read-outline", href: "/tasks" },
  { label: "Reporting", icon: "solar:chart-bold", href: "/reporting" },
  { label: "Users", icon: "solar:user-bold", href: "/users" },
  { label: "Roles", icon: "solar:shield-user-bold", href: "/roles" },
  {
    label: "Customers",
    icon: "solar:users-group-rounded-bold",
    href: "/customers",
    children: [
      { label: "All Customers", href: "/customers" },
      { label: "Segments", href: "/customers/segments" },
    ],
  },
  { label: "Settings", icon: "solar:settings-bold", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-surface border-r border-default-200 flex flex-col">
      <div className="flex items-center gap-2 px-6 py-5">
        <Icon className="text-accent" icon="solar:clothes-2-bold" width={32} />
        <span className="font-bold text-2xl tracking-tight text-foreground">
          Admin Dashboard
        </span>
      </div>
      <Separator />
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        {navItems
          .filter((item) => !item.children)
          .map((item) => (
            <Link
              key={item.label}
              className="flex items-center gap-3 px-4 py-2 rounded-md text-foreground hover:bg-default-100 transition"
              href={item.href}
            >
              <Icon icon={item.icon} width={22} />
              <span>{item.label}</span>
            </Link>
          ))}
        <Accordion
          className="flex flex-col gap-1"
        >
          {navItems
            .filter((item) => item.children)
            .map((item) => (
              <Accordion.Item key={item.label} id={item.label}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <div className="flex items-center gap-2">
                      <Icon className="text-foreground" icon={item.icon} width={22} />
                      <span>{item.label}</span>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <div className="flex flex-col gap-2 pl-8 pb-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        className="flex items-center gap-3 px-2 py-1 rounded-md text-foreground hover:text-primary transition"
                        href={child.href}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
        </Accordion>
      </nav>
      <div className="px-4 py-4">
        <ThemeSwitcher />
        <Popover>
          <Popover.Trigger>
            <div className="flex items-center gap-3 cursor-pointer rounded-md px-2 py-2 hover:bg-default-100 transition">
              <Avatar
                className="w-10 h-10 text-base font-semibold"
              >
                AD
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-semibold text-foreground leading-tight">
                  Admin
                </span>
                <span className="text-default-500 text-sm truncate">
                  admin@gmail.com
                </span>
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content className="px-1 w-56">
            <Button
              className="w-full"
              variant="danger"
            >
              <Icon icon="solar:logout-2-bold" width={20} />
              Logout
            </Button>
          </Popover.Content>
        </Popover>
      </div>
    </aside>
  );
}

