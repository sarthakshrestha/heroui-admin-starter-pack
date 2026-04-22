import React from "react";
import {
  Table,
  Button,
  Avatar,
  Checkbox,
  Chip,
} from "@heroui/react";
import {
  Eye,
  Pencil,
  TrashBin,
  Copy,
} from "@gravity-ui/icons";

// Table columns
const columns = [
  { name: "Worker ID", uid: "workerId", sortable: true },
  { name: "Member", uid: "member", sortable: true },
  { name: "Role", uid: "role", sortable: true },
  { name: "Worker Type", uid: "workerType", sortable: true },
  { name: "Actions", uid: "actions" },
];

// Mock data matching the screenshot
const members = [
  {
    id: "#4586936",
    name: "Alex Turner",
    email: "alex@acme.com",
    role: "Product Manager",
    workerType: "Employee",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/indigo.jpg",
  },
  {
    id: "#4586937",
    name: "Emma Davis",
    email: "emma@acme.com",
    role: "Senior Designer",
    workerType: "Employee",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/rose.jpg",
  },
  {
    id: "#4586933",
    name: "John Smith",
    email: "john@acme.com",
    role: "Chief Technology Officer",
    workerType: "Employee",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/sky.jpg",
  },
  {
    id: "#4586932",
    name: "Kate Moore",
    email: "kate@acme.com",
    role: "Chief Executive Officer",
    workerType: "Employee",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg",
  },
  {
    id: "#4586935",
    name: "Mike Wilson",
    email: "mike@acme.com",
    role: "VP of Engineering",
    workerType: "Employee",
    avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green-dark.jpg",
  },
];

export default function OrderTable() {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));

  const renderCell = React.useCallback((member: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "workerId":
        return (
          <div className="flex items-center gap-2">
            <span className="font-sans tabular-nums text-secondary-text text-sm font-medium">{member.id}</span>
            <Button isIconOnly size="sm" variant="secondary" className="h-7 w-7 min-w-0 text-tertiary-text bg-transparent hover:bg-surface-featured rounded-pill border-none shadow-none transition-colors">
              <Copy width={14} />
            </Button>
          </div>
        );
      case "member":
        return (
          <div className="flex items-center gap-3">
            <Avatar size="sm" className="h-9 w-9 rounded-pill">
              <Avatar.Image src={member.avatar} />
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-display font-medium text-primary-text truncate max-w-[140px] tracking-tight">{member.name}</span>
              <span className="text-[12px] font-sans text-tertiary-text">{member.email}</span>
            </div>
          </div>
        );
      case "role":
        return <span className="text-sm font-sans text-secondary-text tracking-tight">{member.role}</span>;
      case "workerType":
        return (
          <Chip size="sm" variant="flat" className="bg-surface-featured text-secondary-text font-display font-medium text-[11px] h-6 px-3 rounded-pill border-none">
            {member.workerType}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-1 ">
            <Button isIconOnly size="sm" variant="secondary" className="text-tertiary-text bg-transparent hover:bg-surface-featured rounded-pill h-9 w-9 min-w-0 transition-all active:scale-95 border-none shadow-none">
              <Eye width={18} />
            </Button>
            <Button isIconOnly size="sm" variant="secondary" className="text-tertiary-text bg-transparent hover:bg-surface-featured rounded-pill h-9 w-9 min-w-0 transition-all active:scale-95 border-none shadow-none">
              <Pencil width={18} />
            </Button>
            <Button isIconOnly size="sm" variant="secondary" className="text-revolut-danger/60 bg-transparent hover:bg-revolut-danger/5 rounded-pill h-9 w-9 min-w-0 transition-all active:scale-95 border-none shadow-none">
              <TrashBin width={18} />
            </Button>
          </div>
        );
      default:
        return <span>{member[columnKey as keyof typeof member]}</span>;
    }
  }, []);

  return (
    <Table className="bg-none shadow-none border-none">
      <Table.Content
        aria-label="Team members table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        className="shadow-none border-none"
      >
        <Table.Header className="bg-transparent border-b border-divider/5">
          <Table.Column className="px-6 h-14 bg-transparent border-none">
            <Checkbox slot="selection" />
          </Table.Column>
          {columns.map((column) => (
            <Table.Column
              key={column.uid}
              className={column.uid === "actions" ? "text-right px-6 h-14 bg-transparent border-none" : "text-left px-6 h-14 bg-transparent border-none"}
            >
              <span className="text-[11px] font-display font-medium uppercase tracking-[0.1em] text-tertiary-text">
                {column.name}
              </span>
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body className="divide-y divide-divider/5">
          {members.map((member) => (
            <Table.Row key={member.id} className="hover:bg-surface-featured/50 transition-colors border-none group">
              <Table.Cell className="px-6 py-5">
                <Checkbox slot="selection" />
              </Table.Cell>
              {columns.map((column) => (
                <Table.Cell key={column.uid} className={column.uid === "actions" ? "text-right px-6 py-5" : "text-left px-6 py-5"}>
                  {renderCell(member, column.uid)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table>
  );
}


