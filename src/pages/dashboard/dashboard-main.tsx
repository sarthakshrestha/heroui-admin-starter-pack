import React from "react";
import {
  Button,
  Tabs,
  Select,
  ListBox,
  Card,
  Chip,
  TextField,
  InputGroup,
  Dropdown,
} from "@heroui/react";
import {
  Magnifier,
  Bell,
  PersonPlus,
  ArrowRotateRight,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  EllipsisVertical,
  Funnel,
  BarsDescendingAlignLeft,
  LayoutColumns,
} from "@gravity-ui/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import OrderTable from "./tables/dashboard-table";
import SidebarLayout from "@/layouts/sidebar-layout";

// Mock data for charts
const salesData = [
  { name: "01", value: 30 },
  { name: "02", value: 55 },
  { name: "03", value: 40 },
  { name: "04", value: 25 },
  { name: "05", value: 45 },
  { name: "06", value: 35 },
  { name: "07", value: 32 },
  { name: "08", value: 28 },
  { name: "09", value: 15 },
  { name: "10", value: 42 },
  { name: "11", value: 38 },
  { name: "12", value: 30 },
];

const trafficData = [
  { name: "Jan", organic: 5, paid: 2 },
  { name: "Feb", organic: 18, paid: 12 },
  { name: "Mar", organic: 12, paid: 15 },
  { name: "Apr", organic: 18, paid: 18 },
  { name: "May", organic: 18, paid: 8 },
  { name: "Jun", organic: 8, paid: 10 },
  { name: "Jul", organic: 22, paid: 12 },
  { name: "Aug", organic: 22, paid: 8 },
  { name: "Sep", organic: 25, paid: 5 },
  { name: "Oct", organic: 20, paid: 15 },
  { name: "Nov", organic: 30, paid: 25 },
  { name: "Dec", organic: 18, paid: 10 },
];

export default function DashboardMain() {
  const [selectedTab, setSelectedTab] = React.useState("overview");
  const [salesPeriod, setSalesPeriod] = React.useState("last-2-weeks");

  return (
    <SidebarLayout title={
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-signature tracking-tight text-primary-text">Good morning, Kate</h1>
        <div className="flex items-center gap-2">
          <Button isIconOnly variant="secondary" size="sm" className="text-default-500">
            <Magnifier width={18} />
          </Button>
          <Button isIconOnly variant="secondary" size="sm" className="text-default-500">
            <Bell width={18} />
          </Button>
          <Button variant="primary" size="sm" className="gap-2 rounded-lg bg-brand-indigo hover:bg-accent-hover transition-all text-white font-signature">
            <PersonPlus width={16} />
            Invite
          </Button>
        </div>
      </div>
    }>
      <div className="flex flex-col gap-6">
        {/* Dashboard Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs
            aria-label="Dashboard views"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="primary"
            className=" border-none"
          >
            <Tabs.ListContainer>
              <Tabs.List className="gap-6 px-4 border-none">
                <Tabs.Tab key="overview" id="overview" className="px-0 text-sm font-signature tracking-tight">Overview</Tabs.Tab>
                <Tabs.Tab key="sales" id="sales" className="px-0 text-sm font-signature tracking-tight">Sales</Tabs.Tab>
                <Tabs.Tab key="expenses" id="expenses" className="px-0 text-sm font-signature tracking-tight">Expenses</Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button isIconOnly variant="secondary" size="sm" className="text-default-500">
              <ArrowRotateRight width={18} />
            </Button>
            <div className="flex items-center bg-white/5 rounded-lg px-0.5 border border-white/5">
              <Button variant="secondary" size="sm" className="gap-2 text-tertiary-text font-signature border-none h-8 bg-transparent hover:text-primary-text">
                <Calendar width={14} />
                Monthly
              </Button>
              <Dropdown>
                <Button isIconOnly variant="secondary" size="sm" className="h-8 w-8 min-w-0 border-none bg-transparent">
                  <ChevronDown width={12} className="text-quaternary-text" />
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu aria-label="Periods" className="bg-level-3 border border-white/8 rounded-lg outline-none">
                    <Dropdown.Item id="daily" className="font-signature text-xs">Daily</Dropdown.Item>
                    <Dropdown.Item id="weekly" className="font-signature text-xs">Weekly</Dropdown.Item>
                    <Dropdown.Item id="monthly" className="font-signature text-xs">Monthly</Dropdown.Item>
                    <Dropdown.Item id="yearly" className="font-signature text-xs">Yearly</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
            <Button variant="primary" size="sm" className="rounded-lg px-4 h-9 bg-white/10 hover:bg-white/15 text-primary-text font-signature border border-white/5 shadow-none transition-all active:scale-95">
              Download
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Revenue", value: "$228,441", trend: "+3.3%", isPositive: true },
            { label: "Expenses", value: "$25,108", trend: "-3.3%", isPositive: false },
            { label: "Sales", value: "458", trend: "+3.3%", isPositive: true },
            { label: "Profit", value: "$203,133", trend: "+4.1%", isPositive: true },
          ].map((kpi, index) => (
            <Card key={index} className="p-6 flex flex-col gap-4 rounded-xl border border-white/5 bg-panel-dark hover:bg-level-3 transition-all cursor-default shadow-none backdrop-blur-sm">
              <span className="text-quaternary-text text-[10px] font-signature uppercase tracking-widest">{kpi.label}</span>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-3xl font-signature text-primary-text tracking-tight">{kpi.value}</span>
                <Chip
                  size="sm"
                  variant="soft"
                  className={`font-signature h-6 px-2 text-[11px] bg-transparent border border-white/5 ${kpi.isPositive ? "text-emerald-500" : "text-red-500"}`}
                >
                  <div className="flex items-center gap-1">
                    {kpi.isPositive ? <ArrowUpRight width={12} /> : <ArrowDownRight width={12} />}
                    {kpi.trend}
                  </div>
                </Chip>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-8 rounded-2xl border border-white/5 bg-panel-dark shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-signature text-primary-text tracking-tight">Sales Performance</h3>
              <Select
                aria-label="Period select"
                className="w-36"
                selectedKey={salesPeriod}
                onSelectionChange={(key) => setSalesPeriod(String(key))}
              >
                <Select.Trigger className="bg-white/5 rounded-lg border border-white/5 h-8 px-3 text-xs font-signature text-secondary-text hover:text-primary-text transition-all shadow-none">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="last-week">Last week</ListBox.Item>
                    <ListBox.Item id="last-2-weeks">Last 2 weeks</ListBox.Item>
                    <ListBox.Item id="last-month">Last month</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            <div className="flex gap-8 mb-6">
              {[
                { label: "Weekly Sales", value: "$28,441", trend: "+3.3%" },
                { label: "Daily Sales", value: "$4,063", trend: "+3.3%" },
                { label: "Total Sales", value: "278", trend: "+3.3%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-signature text-primary-text tabular-nums tracking-tight">{stat.value}</span>
                    <span className="text-[10px] font-signature text-emerald-500 flex items-center">
                      <ArrowUpRight width={10} />
                      {stat.trend}
                    </span>
                  </div>
                  <span className="text-tertiary-text text-[11px] font-regular tracking-tight">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--divider)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-tertiary-text)", fontSize: 10, fontWeight: 510 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <RechartsTooltip content={<div className="bg-background border border-divider p-2 rounded-xl shadow-xl text-xs" />} />
                  <Bar
                    dataKey="value"
                    fill="var(--primary)"
                    radius={[8, 8, 8, 8]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 rounded-2xl border border-white/5 bg-panel-dark shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-signature text-primary-text tracking-tight">Traffic Source</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-[10px] font-signature">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-indigo" />
                    <span className="text-tertiary-text tracking-tight uppercase">Organic</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-violet" />
                    <span className="text-tertiary-text tracking-tight uppercase">Paid Ads</span>
                  </div>
                </div>
                <Button isIconOnly variant="secondary" size="sm" className="text-default-400 h-8 w-8 min-w-0">
                  <EllipsisVertical width={16} />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-2xl font-signature text-primary-text tabular-nums tracking-tight">231,856</span>
              <span className="text-tertiary-text text-[11px] font-regular">Sessions</span>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--divider)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--default-400)", fontSize: 10, fontWeight: 510 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="organic"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="paid"
                    stroke="var(--secondary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Employees Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-signature text-primary-text tracking-tight">All Employees</span>
              <Chip size="sm" variant="soft" className="bg-white/5 font-signature text-tertiary-text px-1.5 h-4.5 text-[10px] border-none">32</Chip>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="gap-2 bg-white/4 rounded-lg px-3 font-signature text-tertiary-text border border-white/5 hover:text-primary-text transition-all">
                  <Funnel width={14} />
                  Filter
                </Button>
                <Button variant="secondary" size="sm" className="gap-2 bg-white/4 rounded-lg px-3 font-signature text-tertiary-text border border-white/5 hover:text-primary-text transition-all">
                  <BarsDescendingAlignLeft width={14} />
                  Sort
                </Button>
                <Button variant="secondary" size="sm" className="gap-2 bg-white/4 rounded-lg px-3 font-signature text-tertiary-text border border-white/5 hover:text-primary-text transition-all">
                  <LayoutColumns width={14} />
                  Columns
                </Button>
              </div>
              <div className="w-full sm:w-auto sm:min-w-[200px]">
                <TextField aria-label="Search employees">
                  <InputGroup className="bg-white/4 rounded-lg border border-white/5 shadow-none h-9 group focus-within:border-white/10 transition-all">
                    <InputGroup.Prefix className="pl-3">
                      <Magnifier className="text-quaternary-text" width={16} />
                    </InputGroup.Prefix>
                    <InputGroup.Input placeholder="Search..." className="text-xs font-regular text-primary-text placeholder:text-quaternary-text" />
                  </InputGroup>
                </TextField>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-panel-dark border border-white/5 overflow-hidden min-h-[400px]">
            <OrderTable />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

