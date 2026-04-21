import React from "react";
import {
  Button,
  Tooltip,
  Drawer,
  Chip,
  Link as HeroUILink
} from "@heroui/react";
import { LayoutSideContent, PersonPlus } from "@gravity-ui/icons";
import { Link } from "react-router-dom";

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
        className={`hidden md:flex flex-col bg-content1 transition-all duration-400 ease-in-out shrink-0 sticky top-0 h-screen overflow-hidden ${collapsed ? "w-0" : "w-64"
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
          <Drawer.Dialog className="h-full bg-content1 rounded-r-3xl overflow-hidden max-w-[280px]">
            <Sidebar />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>

      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-divider bg-background/80 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Button
              isIconOnly
              variant="secondary"
              size="sm"
              aria-label="Open sidebar"
              className="flex md:hidden text-tertiary-text rounded-md bg-transparent hover:bg-surface-hover transition-all border-none shadow-none"
              onPress={() => setOpen(true)}
            >
              <LayoutSideContent width={18} />
            </Button>

            <Tooltip delay={500}>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  variant="secondary"
                  size="sm"
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  className="hidden md:flex text-tertiary-text rounded-md bg-transparent hover:bg-surface-hover transition-all border-none shadow-none"
                  onPress={() => setCollapsed((v) => !v)}
                >
                  <LayoutSideContent width={18} />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </Tooltip.Content>
            </Tooltip>

            <div className="flex items-center gap-2 min-w-0">
              <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <Link to="/dashboard" className="text-[13px] font-interact text-tertiary-text hover:text-primary-text transition-colors whitespace-nowrap">Dashboard</Link>
                <span className="text-quaternary-text text-[10px]">/</span>
                <span className="text-[13px] font-interact text-primary-text whitespace-nowrap">Overview</span>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="primary" size="sm" className="hidden sm:flex gap-2 rounded-pill bg-foreground hover:opacity-90 transition-all text-background font-interact px-6 h-9 shadow-button">
              <PersonPlus width={16} />
              Invite
            </Button>
            <div className="flex items-center -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-surface-card overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <Chip size="sm" variant="soft" className="bg-brand-light text-brand-deep font-announce px-2.5 h-6 rounded-pill text-[11px] border-none">PRO PLAN</Chip>
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
