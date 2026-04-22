import { Card, Chip } from "@heroui/react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "@gravity-ui/icons";

interface KpiCardData {
  change: number;
  data: { value: number }[];
  isPositive: boolean;
  title: string;
  value: number;
}

const KpiCards = () => {
  const kpiData: KpiCardData[] = [
    {
      title: "Full Orders",
      value: 3298,
      change: 32,
      isPositive: true,
      data: [
        { value: 20 }, { value: 25 }, { value: 22 }, { value: 28 }, { value: 24 },
        { value: 30 }, { value: 28 }, { value: 32 }, { value: 30 }, { value: 35 },
      ],
    },
    {
      title: "Partial Orders",
      value: 1340,
      change: 3,
      isPositive: false,
      data: [
        { value: 30 }, { value: 28 }, { value: 25 }, { value: 27 }, { value: 24 },
        { value: 22 }, { value: 23 }, { value: 21 }, { value: 20 }, { value: 19 },
      ],
    },
    {
      title: "Waiting Orders",
      value: 1340,
      change: 3,
      isPositive: false,
      data: [
        { value: 28 }, { value: 26 }, { value: 24 }, { value: 25 }, { value: 23 },
        { value: 21 }, { value: 22 }, { value: 20 }, { value: 19 }, { value: 18 },
      ],
    },
    {
      title: "Nearly Ready",
      value: 3543,
      change: 7,
      isPositive: true,
      data: [
        { value: 22 }, { value: 24 }, { value: 26 }, { value: 25 }, { value: 28 },
        { value: 30 }, { value: 29 }, { value: 32 }, { value: 34 }, { value: 36 },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="bg-surface-card border border-divider/5 shadow-none rounded-card overflow-hidden group hover:bg-surface-featured transition-colors">
          <Card.Content className="p-0">
            <div className="p-6 pb-2 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-display font-medium text-tertiary-text text-[11px] uppercase tracking-[0.1em]">{kpi.title}</p>
                <h2 className="font-display font-medium text-3xl tracking-tight text-primary-text">
                  {kpi.value.toLocaleString()}
                </h2>
              </div>
              <div className="flex items-center gap-1">
                <Chip
                  size="sm"
                  variant="flat"
                  className={`font-display font-medium h-6 px-2.5 text-[11px] rounded-pill border-none ${kpi.isPositive ? "bg-revolut-teal/10 text-revolut-teal" : "bg-revolut-danger/10 text-revolut-danger"}`}
                >
                  <div className="flex items-center gap-1">
                    {kpi.isPositive ? <ArrowUpRight width={14} /> : <ArrowDownRight width={14} />}
                    {kpi.isPositive ? "+" : "-"}{kpi.change}%
                  </div>
                </Chip>
              </div>
            </div>
            <div className="h-16 w-full mt-2">
              <ResponsiveContainer height="100%" width="100%">
                <LineChart data={kpi.data}>
                  <Line
                    dataKey="value"
                    dot={false}
                    stroke={kpi.isPositive ? "#00a87e" : "#e23b4a"}
                    strokeWidth={2}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};


export default KpiCards;
