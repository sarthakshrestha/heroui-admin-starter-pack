import { Button } from "@heroui/button";
import { Tabs, Tab, Select, SelectItem } from "@heroui/react";
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
            className="w-1/2 md:w-auto"
            color="default"
            startContent={
              <Icon icon="line-md:cloud-alt-upload-filled-loop" width={18} />
            }
            variant="bordered"
          >
            Import
          </Button>
          <Button
            className="w-1/2 md:w-auto"
            color="primary"
            startContent={<Icon icon="ic:baseline-plus" width={18} />}
          >
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
            classNames={{
              tab: "px-4 py-2 rounded-xl text-base font-medium",
              tabContent: "flex items-center gap-2",
              tabList: "gap-2",
            }}
            selectedKey={selectedTab}
            variant="light"
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            {tabsData.map((tab) => (
              <Tab
                key={tab.key}
                title={
                  <span className="flex items-center gap-2">
                    <Icon
                      className="text-default-700"
                      icon={tab.icon}
                      width={20}
                    />
                    <span className="text-default-700">{tab.label}</span>
                  </span>
                }
              >
                {tab.content}
              </Tab>
            ))}
          </Tabs>
        </div>
        {/* Mobile select */}
        <div className="md:hidden">
          <Select
            className="max-w-xs mb-4"
            items={tabsData.map((tab) => ({ key: tab.key, label: tab.label }))}
            label="Order Tabs"
            placeholder="Select a tab"
            selectedKeys={[selectedTab]}
            onSelectionChange={(keys) =>
              setSelectedTab(Array.from(keys)[0] as string)
            }
          >
            {(item) => <SelectItem>{item.label}</SelectItem>}
          </Select>
          {tabsData.find((tab) => tab.key === selectedTab)?.content}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default DashboardMain;
