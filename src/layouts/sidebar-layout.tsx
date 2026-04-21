import React from "react";
import {
  Button,
  Breadcrumbs,
  BreadcrumbsItem,
  Tooltip,
  Drawer
} from "@heroui/react";
import { LayoutSideContent } from "@gravity-ui/icons";

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
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col bg-content1 border-r border-divider transition-all duration-400 ease-in-out shrink-0 overflow-hidden ${collapsed ? "w-0 border-r-0" : "w-64"
          }`}
      >
        <div className="w-64 h-full">
          <Sidebar />
        </div>
      </aside>

      {/* Sidebar drawer for mobile */}
      <Drawer
        isOpen={open}
        onOpenChange={setOpen}
      >
        <Drawer.Backdrop className="backdrop-blur-sm bg-black/20" />
        <Drawer.Content
          placement="left"
          className="p-0 bg-transparent shadow-none"
        >
          <Drawer.Dialog className="h-full bg-content1 rounded-r-3xl overflow-hidden border-r border-divider max-w-[280px]">
            <Sidebar />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>

      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-divider bg-background/70 backdrop-blur-xl px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Button
              isIconOnly
              variant="ghost"
              color="default"
              size="sm"
              aria-label="Open sidebar"
              className="flex md:hidden text-default-500 rounded-xl"
              onPress={() => setOpen(true)}
            >
              <LayoutSideContent width={20} />
            </Button>

            <Tooltip delay={500}>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  color="default"
                  size="sm"
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  className="hidden md:flex text-default-500 rounded-xl"
                  onPress={() => setCollapsed((v) => !v)}
                >
                  <LayoutSideContent
                    width={20}
                  />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </Tooltip.Content>
            </Tooltip>

            <div className="flex flex-col min-w-0 ml-1 sm:ml-0">
              {breadcrumbs && (
                <Breadcrumbs
                  className="hidden sm:block mb-0.5"
                  variant="light"
                  size="sm"
                  color="foreground"
                >
                  {breadcrumbs.map((item) => (
                    <BreadcrumbsItem key={item.label} href={item.href}>
                      {item.label}
                    </BreadcrumbsItem>
                  ))}
                </Breadcrumbs>
              )}
              {title && (
                <h1 className="text-sm sm:text-base font-bold text-foreground truncate tracking-tight">
                  {title}
                </h1>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-default-100 rounded-full px-3 py-1 text-[11px] font-bold text-default-500 border border-default-200">
              PRO PLAN
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-default-100/20">
          <div className="mx-auto max-w-400">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
