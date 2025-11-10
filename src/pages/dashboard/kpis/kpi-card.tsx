import { Card, CardBody } from "@heroui/react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Icon } from "@iconify/react";

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
        { value: 20 },
        { value: 25 },
        { value: 22 },
        { value: 28 },
        { value: 24 },
        { value: 30 },
        { value: 28 },
        { value: 32 },
        { value: 30 },
        { value: 35 },
      ],
    },
    {
      title: "Partial Orders",
      value: 1340,
      change: 3,
      isPositive: false,
      data: [
        { value: 30 },
        { value: 28 },
        { value: 25 },
        { value: 27 },
        { value: 24 },
        { value: 22 },
        { value: 23 },
        { value: 21 },
        { value: 20 },
        { value: 19 },
      ],
    },
    {
      title: "Waiting Orders",
      value: 1340,
      change: 3,
      isPositive: false,
      data: [
        { value: 28 },
        { value: 26 },
        { value: 24 },
        { value: 25 },
        { value: 23 },
        { value: 21 },
        { value: 22 },
        { value: 20 },
        { value: 19 },
        { value: 18 },
      ],
    },
    {
      title: "Nearly Ready",
      value: 3543,
      change: 7,
      isPositive: true,
      data: [
        { value: 22 },
        { value: 24 },
        { value: 26 },
        { value: 25 },
        { value: 28 },
        { value: 30 },
        { value: 29 },
        { value: 32 },
        { value: 34 },
        { value: 36 },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="border-divider">
          <CardBody className="p-0">
            <div className="p-6 flex flex-col gap-1">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <p className="font-medium text-gray-500 text-sm">{kpi.title}</p>
                <h2 className="font-bold text-4xl">
                  {kpi.value.toLocaleString()}
                </h2>
              </div>
              {/* Change Indicator */}
              <div className="flex items-center gap-1 mt-4">
                <span
                  className={`flex items-center gap-1 font-medium text-sm ${
                    kpi.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kpi.change}% {kpi.isPositive ? "increase" : "decrease"}
                  <Icon
                    icon={
                      kpi.isPositive
                        ? "mingcute:trending-up-line"
                        : "mingcute:trending-down-line"
                    }
                    width={16}
                  />
                </span>
              </div>
            </div>
            {/* Chart outside the padded div */}
            <div className="h-16 -my-2 w-full">
              <ResponsiveContainer height="100%" width="100%">
                <LineChart data={kpi.data}>
                  <Line
                    dataKey="value"
                    dot={false}
                    stroke={kpi.isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default KpiCards;
