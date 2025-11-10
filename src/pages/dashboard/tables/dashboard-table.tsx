import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Progress,
  Selection,
  SortDescriptor,
} from "@heroui/react";
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

const fillOptions = [
  { name: "Full", uid: "Full" },
  { name: "Partial", uid: "Partial" },
];

const expectationOptions = [
  { name: "On Time", uid: "On Time" },
  { name: "Delayed", uid: "Delayed" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "stockCode",
  "customerName",
  "recommendationScore",
  "priorityScore",
  "fill",
  "expectation",
  "actions",
];

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export default function OrderTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [fillFilter, setFillFilter] = React.useState<Selection>("all");
  const [expectationFilter, setExpectationFilter] =
    React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "recommendationScore",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns as Set<string>).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...orders];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.customerName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          order.stockCode.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      fillFilter !== "all" &&
      Array.from(fillFilter as Set<string>).length !== fillOptions.length
    ) {
      filteredOrders = filteredOrders.filter((order) =>
        Array.from(fillFilter as Set<string>).includes(order.fill)
      );
    }
    if (
      expectationFilter !== "all" &&
      Array.from(expectationFilter as Set<string>).length !==
        expectationOptions.length
    ) {
      filteredOrders = filteredOrders.filter((order) =>
        Array.from(expectationFilter as Set<string>).includes(order.expectation)
      );
    }

    return filteredOrders;
  }, [orders, filterValue, fillFilter, expectationFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (order: (typeof orders)[0], columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof typeof order];

      switch (columnKey as string) {
        case "stockCode":
          return cellValue;
        case "customerName":
          return cellValue;
        case "recommendationScore":
          return (
            <Chip color="primary" variant="flat">
              {cellValue}
            </Chip>
          );
        case "priorityScore":
          return (
            <Chip color="secondary" variant="flat">
              {cellValue}
            </Chip>
          );
        case "fill":
          return (
            <Progress
              aria-label="Fill"
              className="w-20"
              color={fillColorMap[order.fill]}
              value={order.fill === "Full" ? 100 : 50}
            />
          );
        case "expectation":
          return (
            <Chip
              color={
                expectationColorMap[
                  order.expectation as keyof typeof expectationColorMap
                ] || "default"
              }
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <Button isIconOnly size="sm" variant="light">
              <Icon icon="ic:round-chevron-right" width={18} />
            </Button>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by customer name or stock code..."
            startContent={<Icon icon="solar:magnifer-bold" width={18} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <Icon
                      className="text-small"
                      icon="mingcute:down-line"
                      width={18}
                    />
                  }
                  variant="flat"
                >
                  Fill
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Fill Filter"
                closeOnSelect={false}
                selectedKeys={fillFilter}
                selectionMode="multiple"
                onSelectionChange={setFillFilter}
              >
                {fillOptions.map((fill) => (
                  <DropdownItem key={fill.uid} className="capitalize">
                    {capitalize(fill.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <Icon
                      className="text-small"
                      icon="mingcute:down-line"
                      width={18}
                    />
                  }
                  variant="flat"
                >
                  Expectation
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Expectation Filter"
                closeOnSelect={false}
                selectedKeys={expectationFilter}
                selectionMode="multiple"
                onSelectionChange={setExpectationFilter}
              >
                {expectationOptions.map((expectation) => (
                  <DropdownItem key={expectation.uid} className="capitalize">
                    {capitalize(expectation.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <Icon
                      className="text-small"
                      icon="mingcute:down-line"
                      width={18}
                    />
                  }
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {orders.length} orders
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    fillFilter,
    expectationFilter,
    visibleColumns,
    onRowsPerPageChange,
    orders.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${(selectedKeys as Set<string>).size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      aria-label="Order Table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[420px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
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
      <TableBody emptyContent={"No orders found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
