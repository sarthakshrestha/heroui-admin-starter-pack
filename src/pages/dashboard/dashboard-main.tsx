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
            className="max-w-xs"
          >
            <Tabs.ListContainer>
              <Tabs.List className="gap-8 px-0 border-none bg-transparent">
                <Tabs.Tab key="overview" id="overview">
                  Overview
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab key="sales" id="sales">
                  Sales
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab key="expenses" id="expenses">
                  Expenses
                  <Tabs.Indicator />
                </Tabs.Tab>
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
              <Dropdown.Popover placement="bottom start">
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
            <Card key={index} className="p-8 flex flex-col gap-6 rounded-card border border-divider bg-surface-card transition-all cursor-default shadow-none hover:bg-surface-featured transition-colors">
              <span className="text-tertiary-text text-[11px] font-display font-medium uppercase tracking-[0.1em]">{kpi.label}</span>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-3xl font-display font-medium text-primary-text tracking-tight">{kpi.value}</span>
                <Chip
                  size="sm"
                  variant="flat"
                  className={`font-display font-medium h-7 px-3 text-[11px] rounded-pill border-none ${kpi.isPositive ? "bg-revolut-teal/10 text-revolut-teal" : "bg-revolut-danger/10 text-revolut-danger"}`}
                >
                  <div className="flex items-center gap-1">
                    {kpi.isPositive ? <ArrowUpRight width={14} /> : <ArrowDownRight width={14} />}
                    {kpi.trend}
                  </div>
                </Chip>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-8 rounded-card border border-divider bg-surface-card shadow-none">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-medium text-primary-text tracking-tight">Sales Performance</h3>
              <Select
                aria-label="Period select"
                className="w-36"
                selectedKey={salesPeriod}
                onSelectionChange={(key) => setSalesPeriod(String(key))}
              >
                <Select.Trigger className="bg-surface-featured rounded-pill border-none h-10 px-4 text-[13px] font-display font-medium text-secondary-text hover:text-primary-text transition-all shadow-none">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-surface-card border border-divider/5 rounded-standard shadow-xl p-1">
                    <ListBox.Item id="last-week" className="rounded-lg hover:bg-surface-featured transition-colors font-display font-medium text-sm px-3 py-2">Last week</ListBox.Item>
                    <ListBox.Item id="last-2-weeks" className="rounded-lg hover:bg-surface-featured transition-colors font-display font-medium text-sm px-3 py-2">Last 2 weeks</ListBox.Item>
                    <ListBox.Item id="last-month" className="rounded-lg hover:bg-surface-featured transition-colors font-display font-medium text-sm px-3 py-2">Last month</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="var(--color-chart-grid)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8d969e", fontSize: 11, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8d969e", fontSize: 11, fontWeight: 500 }}
                  />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.01)' }} content={<div className="bg-background border border-divider/5 p-4 rounded-xl shadow-2xl text-[13px] font-display font-medium" />} />
                  <Bar
                    dataKey="value"
                    fill="#494fdf"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 rounded-card border border-divider bg-surface-card shadow-none">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-medium text-primary-text tracking-tight">Traffic Source</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-[10px] font-display font-medium uppercase tracking-[0.15em]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-revolut-blue" />
                    <span className="text-tertiary-text">Organic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                    <span className="text-tertiary-text">Paid Ads</span>
                  </div>
                </div>
                <Button isIconOnly variant="secondary" size="sm" className="text-tertiary-text h-8 w-8 min-w-0 rounded-pill hover:bg-surface-featured border-none shadow-none">
                  <EllipsisVertical width={18} />
                </Button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="var(--color-chart-grid)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8d969e", fontSize: 11, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8d969e", fontSize: 11, fontWeight: 500 }}
                  />
                  <RechartsTooltip content={<div className="bg-background border border-divider/5 p-4 rounded-xl shadow-2xl text-[13px] font-display font-medium" />} />
                  <Line
                    type="monotone"
                    dataKey="organic"
                    stroke="#494fdf"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ r: 6, fill: '#494fdf', stroke: '#fff', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="paid"
                    stroke="#191c1f"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ r: 6, fill: '#191c1f', stroke: '#fff', strokeWidth: 2 }}
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
              <Button variant="secondary" size="sm" className="gap-2 bg-surface-featured rounded-pill px-5 h-10 font-display font-medium text-[13px] text-secondary-text border-none hover:text-primary-text transition-all shadow-none">
                <Funnel width={16} />
                Filter
              </Button>
              <Button variant="secondary" size="sm" className="gap-2 bg-surface-featured rounded-pill px-5 h-10 font-display font-medium text-[13px] text-secondary-text border-none hover:text-primary-text transition-all shadow-none">
                <BarsDescendingAlignLeft width={16} />
                Sort
              </Button>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[320px]">
              <TextField aria-label="Search employees" className="w-full">
                <InputGroup className="bg-surface-featured rounded-pill border-none shadow-none h-11 group transition-all">
                  <InputGroup.Prefix className="pl-5">
                    <Magnifier className="text-tertiary-text group-focus-within:text-revolut-blue" width={18} />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="Search team members..." className="text-sm font-sans font-normal text-primary-text placeholder:text-tertiary-text px-3" />
                </InputGroup>
              </TextField>
            </div>
          </div>
          <div className="rounded-featured border border-divider bg-surface-card shadow-card overflow-hidden min-h-[400px]">
            <OrderTable />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

