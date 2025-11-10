import React from "react";
import { Button, Breadcrumbs, BreadcrumbItem, Tooltip } from "@heroui/react";
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

  React.useEffect(() => {
    function handleSidebarToggle() {
      setOpen(false);
    }

    window.addEventListener("sidebar-toggle", handleSidebarToggle);

    return () => {
      window.removeEventListener("sidebar-toggle", handleSidebarToggle);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <div
        className={`${collapsed ? "w-0" : "w-64"} transition-all duration-300 hidden md:block`}
      >
        {!collapsed && <Sidebar />}
      </div>
      {/* Sidebar drawer for mobile */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 transition-transform duration-300 bg-black/40 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter" || e.key === " ")
            setOpen(false);
        }}
      >
        <div
          className={`h-full w-64 bg-content1 border-r border-divider flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-4 px-4 border-b py-4 border-divider bg-content1 sticky top-0 z-10">
          <div className="flex flex-col flex-1 min-w-0">
            {breadcrumbs && (
              <Breadcrumbs className="mb-1">
                {breadcrumbs.map((item) => (
                  <BreadcrumbItem key={item.label} href={item.href}>
                    {item.label}
                  </BreadcrumbItem>
                ))}
              </Breadcrumbs>
            )}
            <div className="flex items-center gap-2">
              <Tooltip
                className="text-default-700"
                content={
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? open
                      ? "Close sidebar"
                      : "Open sidebar"
                    : collapsed
                      ? "Expand sidebar"
                      : "Collapse sidebar"
                }
              >
                <Button
                  isIconOnly
                  aria-label={
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? open
                        ? "Close sidebar"
                        : "Open sidebar"
                      : collapsed
                        ? "Expand sidebar"
                        : "Collapse sidebar"
                  }
                  variant="light"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth < 768
                    ) {
                      setOpen((v) => !v);
                    } else {
                      setCollapsed((v) => !v);
                    }
                  }}
                >
                  <Icon
                    icon={
                      typeof window !== "undefined" && window.innerWidth < 768
                        ? open
                          ? "solar:sidebar-minimalistic-linear"
                          : "solar:sidebar-minimalistic-linear"
                        : collapsed
                          ? "solar:sidebar-minimalistic-linear"
                          : "solar:sidebar-minimalistic-linear"
                    }
                    width={22}
                  />
                </Button>
              </Tooltip>
              {title && <h1 className=" text-default-900 truncate">{title}</h1>}
            </div>
          </div>
        </header>
        <main className="flex-1 w-full px-6 py-4 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
