import {
  Button,
  Link,
  Popover,
  Accordion,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import ThemeSwitcher from "@/components/theme-switcher";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "solar:home-2-bold", href: "/" },
  { id: "orders", label: "Orders", icon: "solar:layers-bold", href: "/orders" },
  { id: "tasks", label: "Tasks", icon: "solar:check-read-outline", href: "/tasks" },
  { id: "reporting", label: "Reporting", icon: "solar:chart-bold", href: "/reporting" },
  { id: "users", label: "Users", icon: "solar:user-bold", href: "/users" },
  { id: "roles", label: "Roles", icon: "solar:shield-user-bold", href: "/roles" },
  {
    id: "customers",
    label: "Customers",
    icon: "solar:users-group-rounded-bold",
    href: "/customers",
    children: [
      { label: "All Customers", href: "/customers" },
      { label: "Segments", href: "/customers/segments" },
    ],
  },
  { id: "settings", label: "Settings", icon: "solar:settings-bold", href: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-content1">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
          <Icon icon="solar:clothes-2-bold" width={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Admin
        </span>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-3 py-4 text-sm">
        <div className="flex flex-col gap-1">
          {navItems
            .filter((item) => !item.children)
            .map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-default-600 hover:text-foreground hover:bg-default-100 transition-all group no-underline"
              >
                <Icon 
                  icon={item.icon} 
                  width={22} 
                  className="text-default-400 group-hover:text-accent transition-colors"
                />
                <span className="font-medium">{item.label}</span>
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
                    <Accordion.Trigger className="px-3 py-2.5 rounded-xl hover:bg-default-100 transition-all no-underline">
                      <div className="flex items-center gap-3">
                        <Icon 
                          icon={item.icon} 
                          width={22} 
                          className="text-default-400"
                        />
                        <span className="font-medium text-default-600">{item.label}</span>
                      </div>
                      <Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <div className="flex flex-col gap-1 pl-11 pr-2 pb-2 mt-1 border-l-2 border-default-100 ml-5">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="py-1.5 text-sm text-default-500 hover:text-accent transition-colors no-underline"
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

      <div className="mt-auto border-t border-divider p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
           <span className="text-xs font-semibold uppercase tracking-wider text-default-400">Appearance</span>
           <ThemeSwitcher />
        </div>
        
        <Popover>
          <Popover.Trigger>
            <button className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-default-100 transition-all text-left">
              <Avatar className="h-10 w-10">
                <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar.Fallback>AU</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col items-start truncate overflow-hidden">
                <span className="text-sm font-semibold text-foreground">Admin User</span>
                <span className="text-xs text-default-500">admin@acme.com</span>
              </div>
              <Icon icon="solar:alt-arrow-down-linear" className="ml-auto text-default-400" width={16} />
            </button>
          </Popover.Trigger>
          <Popover.Content className="w-56 p-1 rounded-xl">
             <div className="flex flex-col">
                <Button 
                   variant="ghost" 
                   className="justify-start gap-2 border-none text-default-600 hover:text-danger hover:bg-danger-soft transition-colors"
                >
                   <Icon icon="solar:logout-2-bold" width={18} />
                   Logout
                </Button>
             </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}

