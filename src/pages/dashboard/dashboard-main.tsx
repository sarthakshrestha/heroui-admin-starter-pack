import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import KpiCard from "./kpis/kpi-card";

import SidebarLayout from "@/layouts/sidebar-layout";

function DashboardMain() {
  return (
    <SidebarLayout title="Dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <h1 className="text-2xl font-medium text-default-700">
            Welcome back, Admin
          </h1>
          <p className="text-foreground">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            color="default"
            startContent={
              <Icon icon="line-md:cloud-alt-upload-filled-loop" width={18} />
            }
            variant="bordered"
          >
            Import
          </Button>
          <Button
            color="primary"
            startContent={<Icon icon="ic:baseline-plus" width={18} />}
          >
            Add
          </Button>
        </div>
      </div>
      <KpiCard />
    </SidebarLayout>
  );
}

export default DashboardMain;
