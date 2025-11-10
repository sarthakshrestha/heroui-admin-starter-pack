import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";

import KpiCard from "./kpis/kpi-card";
import OrderTable from "./tables/dashboard-table";

import SidebarLayout from "@/layouts/sidebar-layout";

function DashboardMain() {
  return (
    <SidebarLayout title="Dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-medium text-default-700 mb-1">
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
        <Tabs
          aria-label="Order Tabs"
          classNames={{
            tab: "px-4 py-2 rounded-xl text-base font-medium",
            tabContent: "flex items-center gap-2",
            tabList: "gap-2",
          }}
          variant="light"
        >
          <Tab
            key="all"
            title={
              <span className="flex items-center gap-2">
                <Icon
                  className="text-default-700"
                  icon="solar:scan-bold-duotone"
                  width={20}
                />
                <span className="text-default-700">All Orders</span>
              </span>
            }
          >
            <OrderTable />
          </Tab>
          <Tab
            key="confirmed"
            title={
              <span className="flex items-center gap-2">
                <Icon
                  className="text-default-400"
                  icon="solar:check-circle-bold"
                  width={20}
                />
                <span className="text-default-700">Confirmed</span>
              </span>
            }
          >
            <div className="p-6 text-default-400">No confirmed orders.</div>
          </Tab>
          <Tab
            key="need-confirmation"
            title={
              <span className="flex items-center gap-2">
                <Icon
                  className="text-default-400"
                  icon="solar:letter-bold"
                  width={20}
                />
                <span className="text-default-700">Need Confirmation</span>
              </span>
            }
          >
            <div className="p-6 text-default-400">
              No orders needing confirmation.
            </div>
          </Tab>
          <Tab
            key="pick-lists"
            title={
              <span className="flex items-center gap-2">
                <Icon
                  className="text-default-400"
                  icon="solar:list-bold"
                  width={20}
                />
                <span className="text-default-700">Pick-lists</span>
              </span>
            }
          >
            <div className="p-6 text-default-400">No pick-lists available.</div>
          </Tab>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}

export default DashboardMain;
