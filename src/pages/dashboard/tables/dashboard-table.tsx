import React from "react";
import {
  Table,
  Button,
  Avatar,
  Checkbox,
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
            <span className="font-signature tabular-nums text-primary-text text-sm">{member.id}</span>
            <Button isIconOnly size="sm" variant="secondary" className="h-6 w-6 min-w-0 text-quaternary-text bg-transparent hover:bg-white/5 rounded-lg border-none shadow-none">
              <Copy width={12} />
            </Button>
          </div>
        );
      case "member":
        return (
          <div className="flex items-center gap-3">
            <Avatar size="sm" className="h-8 w-8">
              <Avatar.Image src={member.avatar} />
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-signature text-primary-text truncate max-w-[120px] tracking-tight">{member.name}</span>
              <span className="text-[11px] font-regular text-tertiary-text">{member.email}</span>
            </div>
          </div>
        );
      case "role":
        return <span className="text-sm font-regular text-secondary-text tracking-tight">{member.role}</span>;
      case "workerType":
        return <span className="text-sm font-regular text-secondary-text tracking-tight">{member.workerType}</span>;
      case "actions":
        return (
          <div className="flex items-center justify-end gap-1.5 ">
            <Button isIconOnly size="sm" variant="secondary" className="text-quaternary-text bg-transparent hover:bg-white/5 rounded-md h-8 w-8 min-w-0 transition-all active:scale-95 border-none shadow-none">
              <Eye width={16} />
            </Button>
            <Button isIconOnly size="sm" variant="secondary" className="text-quaternary-text bg-transparent hover:bg-white/5 rounded-md h-8 w-8 min-w-0 transition-all active:scale-95 border-none shadow-none">
              <Pencil width={16} />
            </Button>
            <Button isIconOnly size="sm" variant="secondary" className="text-red-500/60 bg-transparent hover:bg-red-500/10 rounded-md h-8 w-8 min-w-0 transition-all active:scale-95 border-none shadow-none">
              <TrashBin width={16} />
            </Button>
          </div>
        );
      default:
        return <span>{member[columnKey as keyof typeof member]}</span>;
    }
  }, []);

  return (
    <Table className="bg-none">
      <Table.Content
        aria-label="Example static collection table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header className="bg-default-100/50">
          <Table.Column>
            <Checkbox slot="selection" />
          </Table.Column>
          {columns.map((column) => (
            <Table.Column
              key={column.uid}
              className={column.uid === "actions" ? "text-right px-6 h-12" : "text-left px-6 h-12"}
            >
              <span className="text-[10px] font-signature uppercase tracking-widest text-tertiary-text">
                {column.name}
              </span>
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {members.map((member) => (
            <Table.Row key={member.id} className="hover:bg-white/2 transition-colors border-b border-white/5 last:border-none">
              <Table.Cell className="px-6">
                <Checkbox slot="selection" />
              </Table.Cell>
              {columns.map((column) => (
                <Table.Cell key={column.uid} className={column.uid === "actions" ? "text-right px-6 py-4" : "text-left px-6 py-4"}>
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

