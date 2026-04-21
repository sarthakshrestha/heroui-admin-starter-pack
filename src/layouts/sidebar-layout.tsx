import React from "react";
import { 
  Button, 
  Breadcrumbs, 
  BreadcrumbsItem, 
  Tooltip, 
  Drawer 
} from "@heroui/react";
import { Icon } from "@iconify/react";

import Sidebar from "./sidebar";

export default function SidebarLayout({
  children,
  title,
  breadcrumbs,
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col bg-content1 border-r border-divider transition-[width] duration-300 ease-in-out ${
          collapsed ? "w-0 overflow-hidden" : "w-64"
        }`}
      >
        <div className="w-64 h-full"> 
          <Sidebar />
        </div>
      </aside>

      {/* Sidebar drawer for mobile */}
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop />
        <Drawer.Content placement="left" className="p-0 max-w-[280px]">
          <Drawer.Dialog className="h-full bg-content1">
            <Sidebar />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>

      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-divider bg-content1 px-4 sm:px-6">
          <div className="flex items-center gap-4 min-w-0">
            <Tooltip>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  onPress={() => {
                    const isMobile = window.innerWidth < 768;
                    if (isMobile) {
                      setOpen(true);
                    } else {
                      setCollapsed((v) => !v);
                    }
                  }}
                >
                  <Icon
                    icon="solar:sidebar-minimalistic-linear"
                    width={22}
                    className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                  />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </Tooltip.Content>
            </Tooltip>

            <div className="flex flex-col min-w-0">
              {breadcrumbs && (
                <Breadcrumbs className="hidden sm:block">
                  {breadcrumbs.map((item) => (
                    <BreadcrumbsItem key={item.label} href={item.href}>
                      {item.label}
                    </BreadcrumbsItem>
                  ))}
                </Breadcrumbs>
              )}
              {title && <h1 className="text-default-900 font-medium truncate">{title}</h1>}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
