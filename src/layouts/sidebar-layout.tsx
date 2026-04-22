import { useState, useRef, ReactNode, Fragment } from "react";
import {
  Button,
  Tooltip,
  Drawer,
  Chip
} from "@heroui/react";
import { LayoutSideContent, PersonPlus } from "@gravity-ui/icons";
import { Link } from "react-router-dom";

import Sidebar from "./sidebar";
import { useClickOutside } from "../hooks/use-click-outside";

export default function SidebarLayout({
  children,
  title,
  breadcrumbs,
}: {
  children: ReactNode;
  title?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useClickOutside(drawerRef, () => {
    if (open) setOpen(false);
  });

  return (
    <div className="flex min-h-screen bg-[var(--color-page-bg)] text-foreground selection:bg-primary/10">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col bg-background transition-all duration-400 ease-in-out shrink-0 sticky top-0 h-screen overflow-hidden border-none shadow-none ${collapsed ? "w-0" : "w-64"
          }`}
      >
        <div className="w-64 h-full border-none">
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
          <Drawer.Dialog className="h-full p-0 bg-content1 rounded-r-3xl overflow-hidden max-w-[280px]">
            <div ref={drawerRef} className="h-full w-full">
              <Sidebar />
            </div>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>

      <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-page-bg)] overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-divider/5 bg-[var(--color-background)]/80 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Button
              isIconOnly
              variant="secondary"
              size="sm"
              aria-label="Open sidebar"
              className="flex md:hidden text-tertiary-text rounded-md bg-transparent hover:bg-foreground/5 transition-all border-none shadow-none"
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
                  className="hidden md:flex text-tertiary-text rounded-md bg-transparent hover:bg-foreground/5 transition-all border-none shadow-none"
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
                {breadcrumbs ? (
                  breadcrumbs.map((item, i) => (
                    <Fragment key={i}>
                      {i > 0 && <span className="text-quaternary-text text-[10px]">/</span>}
                      {item.href ? (
                        <Link to={item.href} className="text-[13px] font-display font-medium text-tertiary-text hover:text-primary-text transition-colors whitespace-nowrap">{item.label}</Link>
                      ) : (
                        <span className="text-[13px] font-display font-medium text-primary-text whitespace-nowrap">{item.label}</span>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <>
                    <Link to="/dashboard" className="text-[13px] font-display font-medium text-tertiary-text hover:text-primary-text transition-colors whitespace-nowrap">Dashboard</Link>
                    <span className="text-quaternary-text text-[10px]">/</span>
                    <span className="text-[13px] font-display font-medium text-primary-text whitespace-nowrap">Overview</span>
                  </>
                )}
              </nav>
              {title && (
                <div className="hidden sm:flex items-center gap-1.5 ml-2">
                  <span className="text-quaternary-text text-[10px]">•</span>
                  <span className="text-xs font-display font-medium text-secondary-text">{title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="solid" size="sm" className="hidden sm:flex gap-2 rounded-pill bg-foreground hover:opacity-85 transition-all text-background font-display font-medium px-6 h-10 shadow-none border-none">
              <PersonPlus width={16} />
              Invite
            </Button>
            <div className="flex items-center -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface-card overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <Chip size="sm" variant="flat" className="bg-revolut-blue/10 text-revolut-blue font-display font-medium px-3 h-7 rounded-pill text-[11px] border-none uppercase tracking-wider">PREMIUM</Chip>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-page-bg">
          <div className="mx-auto max-w-400">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
