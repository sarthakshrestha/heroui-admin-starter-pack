import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@heroui/react";
import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react";

// Table columns
const columns = [
  { name: "Stock Code", uid: "stockCode", sortable: true },
  { name: "Customer Name", uid: "customerName", sortable: true },
  { name: "Recommendation Score", uid: "recommendationScore", sortable: true },
  { name: "Priority Score", uid: "priorityScore", sortable: true },
  { name: "Fill", uid: "fill", sortable: true },
  { name: "Expectation", uid: "expectation", sortable: true },
  { name: "Actions", uid: "actions" },
];

// Example data
const orders = [
  {
    id: 1,
    stockCode: "STK-001",
    customerName: "Acme Corp",
    recommendationScore: 92,
    priorityScore: 87,
    fill: "Full",
    expectation: "On Time",
  },
  {
    id: 2,
    stockCode: "STK-002",
    customerName: "Globex Inc",
    recommendationScore: 75,
    priorityScore: 65,
    fill: "Partial",
    expectation: "Delayed",
  },
  {
    id: 3,
    stockCode: "STK-003",
    customerName: "Soylent Corp",
    recommendationScore: 60,
    priorityScore: 70,
    fill: "Full",
    expectation: "On Time",
  },
  {
    id: 4,
    stockCode: "STK-004",
    customerName: "Initech",
    recommendationScore: 80,
    priorityScore: 90,
    fill: "Partial",
    expectation: "Delayed",
  },
];

const fillColorMap: Record<string, "success" | "warning"> = {
  Full: "success",
  Partial: "warning",
};

const expectationColorMap: Record<string, "success" | "danger"> = {
  "On Time": "success",
  Delayed: "danger",
};

export default function OrderTable() {
  return (
    <Table
      aria-label="Order Table"
      classNames={{
        wrapper: "max-h-[420px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody className="text-default-700" items={orders}>
        {(order) => (
          <TableRow key={order.id} className="text-default-700">
            <TableCell>{order.stockCode}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <Chip color="primary" variant="flat">
                {order.recommendationScore}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip color="secondary" variant="flat">
                {order.priorityScore}
              </Chip>
            </TableCell>
            <TableCell>
              <Progress
                aria-label="Fill"
                className="w-20"
                color={fillColorMap[order.fill]}
                value={order.fill === "Full" ? 100 : 50}
              />
            </TableCell>
            <TableCell>
              <Chip
                color={
                  expectationColorMap[
                    order.expectation as keyof typeof expectationColorMap
                  ] || "default"
                }
                variant="flat"
              >
                {order.expectation}
              </Chip>
            </TableCell>
            <TableCell>
              <Button isIconOnly size="sm" variant="light">
                <Icon icon="solar:eye-bold" width={18} />
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
