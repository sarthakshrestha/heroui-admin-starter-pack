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
  ArrowRotateRight,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  EllipsisVertical,
  Funnel,
  BarsDescendingAlignLeft,
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
      <></>
    }>
      <div className="flex flex-col gap-6">
        {/* Dashboard Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs
            aria-label="Dashboard views"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="primary"
            className="border-none"
          >
            <Tabs.ListContainer>
              <Tabs.List className="gap-8 px-0 border-none bg-transparent">
                <Tabs.Tab key="overview" id="overview" className="px-0 pt-0 pb-4 text-sm font-interact tracking-tight data-[selected=true]:text-brand data-[selected=true]:border-b-2 data-[selected=true]:border-brand rounded-none">Overview</Tabs.Tab>
                <Tabs.Tab key="sales" id="sales" className="px-0 pt-0 pb-4 text-sm font-interact tracking-tight data-[selected=true]:text-brand data-[selected=true]:border-b-2 data-[selected=true]:border-brand rounded-none">Sales</Tabs.Tab>
                <Tabs.Tab key="expenses" id="expenses" className="px-0 pt-0 pb-4 text-sm font-interact tracking-tight data-[selected=true]:text-brand data-[selected=true]:border-b-2 data-[selected=true]:border-brand rounded-none">Expenses</Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button isIconOnly variant="secondary" size="sm" className="text-tertiary-text rounded-pill hover:bg-foreground/5 border-divider/10 shadow-none h-9 w-9">
              <ArrowRotateRight width={16} />
            </Button>
            <Dropdown>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2 bg-transparent rounded-pill px-4 border border-divider/10 h-9 transition-all hover:bg-foreground/5 text-secondary-text font-interact shadow-none"
              >
                <Calendar width={14} className="text-tertiary-text" />
                <span>Monthly</span>
                <ChevronDown width={12} className="text-quaternary-text ml-1" />
              </Button>
              <Dropdown.Popover placement="bottom-start">
                <Dropdown.Menu aria-label="Periods" className="bg-surface-card border border-divider/10 rounded-standard shadow-lg outline-none p-1 min-w-[140px]">
                  <Dropdown.Item id="daily" className="font-interact text-xs rounded-md hover:bg-foreground/5 transition-colors px-3 py-2">Daily</Dropdown.Item>
                  <Dropdown.Item id="weekly" className="font-interact text-xs rounded-md hover:bg-foreground/5 transition-colors px-3 py-2">Weekly</Dropdown.Item>
                  <Dropdown.Item id="monthly" className="font-interact text-xs rounded-md hover:bg-foreground/10 transition-colors px-3 py-2 text-brand bg-brand-light/10">Monthly</Dropdown.Item>
                  <Dropdown.Item id="yearly" className="font-interact text-xs rounded-md hover:bg-foreground/5 transition-colors px-3 py-2">Yearly</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
            <Button variant="primary" size="sm" className="rounded-pill px-6 h-9 bg-foreground hover:opacity-90 text-background font-interact border-none shadow-button transition-all active:scale-95">
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
            <Card key={index} className="p-6 flex flex-col gap-4 rounded-standard border border-divider/5 bg-surface-card transition-all cursor-default shadow-card">
              <span className="text-tertiary-text text-[11px] font-announce uppercase tracking-widest">{kpi.label}</span>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-announce text-primary-text tracking-tight">{kpi.value}</span>
                <Chip
                  size="sm"
                  variant="soft"
                  className={`font-interact h-6 px-2.5 text-[11px] rounded-pill border-none ${kpi.isPositive ? "bg-brand-light text-brand-deep" : "bg-red-50 text-red-600"}`}
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
          <Card className="p-8 rounded-featured border border-divider/5 bg-surface-card shadow-card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-announce text-primary-text tracking-tight">Sales Performance</h3>
              <Select
                aria-label="Period select"
                className="w-36"
                selectedKey={salesPeriod}
                onSelectionChange={(key) => setSalesPeriod(String(key))}
              >
                <Select.Trigger className="bg-transparent rounded-pill border border-divider/10 h-9 px-4 text-xs font-interact text-secondary-text hover:text-primary-text hover:bg-surface-hover transition-all shadow-none">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-surface-card border border-divider/10 rounded-standard shadow-lg">
                    <ListBox.Item id="last-week" className="rounded-md hover:bg-surface-hover transition-colors">Last week</ListBox.Item>
                    <ListBox.Item id="last-2-weeks" className="rounded-md hover:bg-surface-hover transition-colors">Last 2 weeks</ListBox.Item>
                    <ListBox.Item id="last-month" className="rounded-md hover:bg-surface-hover transition-colors">Last month</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666666", fontSize: 11, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666666", fontSize: 11, fontWeight: 500 }}
                  />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} content={<div className="bg-background border border-divider/10 p-3 rounded-lg shadow-xl text-xs font-interact" />} />
                  <Bar
                    dataKey="value"
                    fill="#18E299"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 rounded-featured border border-divider/5 bg-surface-card shadow-card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-announce text-primary-text tracking-tight">Traffic Source</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-[11px] font-announce uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                    <span className="text-tertiary-text">Organic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                    <span className="text-tertiary-text">Paid Ads</span>
                  </div>
                </div>
                <Button isIconOnly variant="secondary" size="sm" className="text-tertiary-text h-8 w-8 min-w-0 rounded-md hover:bg-surface-hover border-none shadow-none">
                  <EllipsisVertical width={16} />
                </Button>
              </div>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666666", fontSize: 11, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666666", fontSize: 11, fontWeight: 500 }}
                  />
                  <RechartsTooltip content={<div className="bg-background border border-divider/10 p-3 rounded-lg shadow-xl text-xs font-interact" />} />
                  <Line
                    type="monotone"
                    dataKey="organic"
                    stroke="#18E299"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: '#18E299', stroke: '#fff', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="paid"
                    stroke="#0d0d0d"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: '#0d0d0d', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Employees Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-announce text-primary-text tracking-tight">Active Team</h3>
            <Chip size="sm" variant="soft" className="bg-brand-light text-brand-deep font-announce px-2.5 h-5 rounded-pill text-[11px] border-none">32</Chip>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" className="gap-2 bg-transparent rounded-pill px-4 h-9 font-interact text-secondary-text border border-divider/10 hover:bg-surface-hover hover:text-primary-text transition-all shadow-none">
                <Funnel width={14} />
                Filter
              </Button>
              <Button variant="secondary" size="sm" className="gap-2 bg-transparent rounded-pill px-4 h-9 font-interact text-secondary-text border border-divider/10 hover:bg-surface-hover hover:text-primary-text transition-all shadow-none">
                <BarsDescendingAlignLeft width={14} />
                Sort
              </Button>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <TextField aria-label="Search employees" className="w-full">
                <InputGroup className="bg-transparent rounded-pill border border-divider/10 shadow-none h-10 group focus-within:border-brand/40 transition-all">
                  <InputGroup.Prefix className="pl-4">
                    <Magnifier className="text-quaternary-text group-focus-within:text-brand" width={16} />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="Search team members..." className="text-sm font-read text-primary-text placeholder:text-quaternary-text" />
                </InputGroup>
              </TextField>
            </div>
          </div>
          <div className="rounded-featured border border-divider/5 bg-surface-card shadow-card overflow-hidden min-h-[400px]">
            <OrderTable />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

