import React from "react";
import {
  Table,
  Chip,
  Button,
  TextField,
  InputGroup,
  Dropdown,
  Pagination,
  ProgressBar,
  Selection,
  SortDescriptor,
  Checkbox,
} from "@heroui/react";
import {
  Magnifier,
  Xmark,
  ChevronDown,
  ChevronRight,
} from "@gravity-ui/icons";

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
      const first = a[sortDescriptor.column as keyof typeof a] as any;
      const second = b[sortDescriptor.column as keyof typeof b] as any;
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
            <Chip color="accent" variant="soft">
              {cellValue}
            </Chip>
          );
        case "priorityScore":
          return (
            <Chip color="accent" variant="soft">
              {cellValue}
            </Chip>
          );
        case "fill":
          // ProgressBar in HeroUI v3 also changed props?
          // Document: v2 Progress -> v3 ProgressBar
          return (
            <ProgressBar
              aria-label="Fill"
              className="w-20"
              value={order.fill === "Full" ? 100 : 50}
            />
          );
        case "expectation":
          return (
            <Chip
              color={
                expectationColorMap[
                  order.expectation as keyof typeof expectationColorMap
                ] === "success" ? "success" : "danger"
              }
              variant="soft"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <Button isIconOnly size="sm" variant="ghost">
              <ChevronRight width={18} />
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

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = (value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = (
    <div className="flex flex-col gap-4 px-2">
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <TextField aria-label="Search" className="w-full sm:max-w-[44%]">
          <InputGroup className="bg-default-100 rounded-xl overflow-hidden border-none shadow-sm">
            <InputGroup.Prefix className="pl-3">
              <Magnifier className="text-default-400" width={20} />
            </InputGroup.Prefix>
            <InputGroup.Input
              className="py-2"
              placeholder="Search by customer name or stock code..."
              value={filterValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {filterValue && (
              <InputGroup.Suffix className="pr-1">
                <Button isIconOnly size="sm" variant="ghost" onClick={onClear}>
                  <Xmark className="text-default-400" width={18} />
                </Button>
              </InputGroup.Suffix>
            )}
          </InputGroup>
        </TextField>
        <div className="flex gap-3">
          <Dropdown>
            <Button
              className="hidden sm:flex"
              variant="secondary"
            >
              Fill
              <ChevronDown
                className="text-small"
                width={14}
              />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                disallowEmptySelection
                aria-label="Fill Filter"
                selectedKeys={fillFilter}
                selectionMode="multiple"
                onSelectionChange={setFillFilter}
              >
                {fillOptions.map((fill) => (
                  <Dropdown.Item key={fill.uid} id={fill.uid} textValue={fill.name}>
                    <div className="capitalize">{capitalize(fill.name)}</div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <Dropdown>
            <Button
              className="hidden sm:flex"
              variant="secondary"
            >
              Expectation
              <ChevronDown
                className="text-small"
                width={14}
              />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                disallowEmptySelection
                aria-label="Expectation Filter"
                selectedKeys={expectationFilter}
                selectionMode="multiple"
                onSelectionChange={setExpectationFilter}
              >
                {expectationOptions.map((expectation) => (
                  <Dropdown.Item key={expectation.uid} id={expectation.uid} textValue={expectation.name}>
                    <div className="capitalize">{capitalize(expectation.name)}</div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <Dropdown>
            <Button
              className="hidden sm:flex"
              variant="secondary"
            >
              Columns
              <ChevronDown
                className="text-small"
                width={14}
              />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                disallowEmptySelection
                aria-label="Table Columns"
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <Dropdown.Item key={column.uid} id={column.uid} textValue={column.name}>
                    <div className="capitalize">{capitalize(column.name)}</div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
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
            className="bg-transparent outline-none text-default-400 text-small"
            value={rowsPerPage}
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

  const bottomContent = (
    <div className="py-3 px-4 flex justify-between items-center bg-default-50/50 rounded-b-xl border-t border-divider">
      <div className="w-[30%]">
        <span className="text-xs font-medium text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${(selectedKeys as Set<string>).size} of ${filteredItems.length} selected`}
        </span>
      </div>

      <Pagination className="gap-6 flex-1 justify-center">
        <Pagination.Summary className="hidden lg:block text-xs text-default-400 font-medium">
          Showing {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredItems.length)} of {filteredItems.length}
        </Pagination.Summary>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous onPress={onPreviousPage} className="rounded-lg h-9">
              <Pagination.PreviousIcon />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          <div className="flex items-center gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                  className="rounded-lg h-9 w-9"
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
          </div>

          <Pagination.Item>
            <Pagination.Next onPress={onNextPage} className="rounded-lg h-9">
              <span className="hidden sm:inline mr-1">Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>

      <div className="w-[30%]" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {topContent}
      <Table className="max-h-[420px]">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Order Table"
            className="min-w-[600px]"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Column>
                <Checkbox slot="selection" />
              </Table.Column>
              {headerColumns.map((column, index) => (
                <Table.Column
                  key={column.uid}
                  allowsSorting={column.sortable}
                  isRowHeader={index === 0}
                  className={column.uid === "actions" ? "text-center" : "text-left"}
                >
                  {column.name}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body renderEmptyState={() => <div className="p-4 text-center">No orders found</div>}>
              {sortedItems.map((item) => (
                <Table.Row id={String(item.id)} key={item.id}>
                  <Table.Cell>
                    <Checkbox slot="selection" />
                  </Table.Cell>
                  {headerColumns.map((column) => (
                    <Table.Cell key={column.uid} className={column.uid === "actions" ? "text-center" : "text-left"}>
                      {renderCell(item, column.uid)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          {bottomContent}
        </Table.Footer>
      </Table>
    </div>
  );
}
