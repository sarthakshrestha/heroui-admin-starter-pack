import {
  Button,
  Divider,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Avatar } from "@heroui/avatar";

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
    <aside className="h-screen w-64 bg-content1 border-r border-divider flex flex-col">
      <div className="flex items-center gap-2 px-6 py-5">
        <Icon className="text-primary" icon="solar:clothes-2-bold" width={32} />
        <span className="font-bold text-2xl tracking-tight text-default-700">
          Admin Dashboard
        </span>
      </div>
      <Divider />
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        {navItems
          .filter((item) => !item.children)
          .map((item) => (
            <Link
              key={item.label}
              className="flex items-center gap-3 px-4 py-2 rounded-medium text-default-700 hover:bg-default-100 transition"
              href={item.href}
            >
              <Icon icon={item.icon} width={22} />
              <span>{item.label}</span>
            </Link>
          ))}
        <Accordion
          isCompact
          className="flex flex-col gap-1 border-none border-0"
          selectionMode="multiple"
          variant="bordered"
        >
          {navItems
            .filter((item) => item.children)
            .map((item) => (
              <AccordionItem
                key={item.label}
                aria-label={item.label}
                startContent={<Icon icon={item.icon} width={22} />}
                title={item.label}
              >
                <div className="flex flex-col gap-2">
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      className="flex items-center gap-3 px-2 py-1 rounded-medium text-default-700 hover:bg-default-100 transition"
                      href={child.href}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </AccordionItem>
            ))}
        </Accordion>
      </nav>
      <div className="px-4 py-4">
        <Popover placement="top-start">
          <PopoverTrigger>
            <div className="flex items-center gap-3 cursor-pointer rounded-medium px-2 py-2 hover:bg-default-100 transition">
              <Avatar
                className="w-10 h-10 text-base font-semibold"
                color="secondary"
                name="Admin"
              >
                AD
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-semibold text-default-900 leading-tight">
                  Admin
                </span>
                <span className="text-default-500 text-sm truncate">
                  admin@gmail.com
                </span>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-1 w-56">
            <Button
              as={Link}
              className="w-full"
              color="danger"
              href="/"
              startContent={<Icon icon="solar:logout-2-bold" width={20} />}
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
}
