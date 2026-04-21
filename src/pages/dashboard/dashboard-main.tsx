import { Button, Tabs, Select, ListBox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

import KpiCard from "./kpis/kpi-card";
import OrderTable from "./tables/dashboard-table";

import SidebarLayout from "@/layouts/sidebar-layout";

const tabsData = [
  {
    key: "all",
    label: "All Orders",
    icon: "solar:scan-bold-duotone",
    content: <OrderTable />,
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: "solar:check-circle-bold",
    content: <div className="p-6 text-default-400">No confirmed orders.</div>,
  },
  {
    key: "need-confirmation",
    label: "Need Confirmation",
    icon: "solar:letter-bold",
    content: (
      <div className="p-6 text-default-400">
        No orders needing confirmation.
      </div>
    ),
  },
  {
    key: "pick-lists",
    label: "Pick-lists",
    icon: "solar:list-bold",
    content: (
      <div className="p-6 text-default-400">No pick-lists available.</div>
    ),
  },
];

function DashboardMain() {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <SidebarLayout title="Dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl font-medium text-default-700 mb-1">
            Welcome back, Admin
          </h1>
          <p className="text-foreground">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            className="w-1/2 md:w-auto border border-default-200"
            variant="outline"
          >
            <Icon icon="line-md:cloud-alt-upload-filled-loop" width={18} />
            Import
          </Button>
          <Button
            className="w-1/2 md:w-auto bg-accent text-white"
            variant="primary"
          >
            <Icon icon="ic:baseline-plus" width={18} />
            Add
          </Button>
        </div>
      </div>
      <KpiCard />
      <div className=" rounded-2xl border border-default-100 p-2 mb-6 mt-2">
        {/* Desktop tabs */}
        <div className="hidden md:block">
          <Tabs
            aria-label="Order Tabs"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            <Tabs.ListContainer>
              <Tabs.List className="gap-4">
                {tabsData.map((tab) => (
                  <Tabs.Tab key={tab.key} id={tab.key}>
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-default-700"
                        icon={tab.icon}
                        width={20}
                      />
                      <span className="text-default-700">{tab.label}</span>
                    </div>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
            {tabsData.map((tab) => (
              <Tabs.Panel key={tab.key} id={tab.key}>
                {tab.content}
              </Tabs.Panel>
            ))}
          </Tabs>
        </div>
        {/* Mobile select */}
        <div className="md:hidden">
          <Select
            className="max-w-xs mb-4"
            placeholder="Select a tab"
            onChange={(value) => {
              if (value) setSelectedTab(String(value));
            }}
          >
            <Select.Trigger>
              <Select.Value>
                {tabsData.find((t) => t.key === selectedTab)?.label || "Select a tab"}
              </Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox items={tabsData}>
                {(item) => (
                  <ListBox.Item id={item.key} textValue={item.label}>
                    {item.label}
                  </ListBox.Item>
                )}
              </ListBox>
            </Select.Popover>
          </Select>
          {tabsData.find((tab) => tab.key === selectedTab)?.content}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default DashboardMain;
