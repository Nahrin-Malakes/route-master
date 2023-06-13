import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RouterOutputs } from "@/utils/api";
import { Edit, Trash } from "lucide-react";

interface CustomersTableProps {
  customers: RouterOutputs["customer"]["getAll"];
}

export const CustomersTable = ({ customers }: CustomersTableProps) => {
  console.log(customers);

  return (
    <Table>
      <TableCaption>A list of your customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Street</TableHead>
          <TableHead>Postal Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.fullName}</TableCell>
            <TableCell>{customer.phoneNumber}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.address?.city}</TableCell>
            <TableCell>{customer.address?.street}</TableCell>
            <TableCell>{customer.address?.postalCode}</TableCell>
            <TableCell className="flex gap-2">
              <Trash />
              <Edit />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
