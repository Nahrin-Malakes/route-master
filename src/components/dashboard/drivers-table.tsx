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

interface DriversTableProps {
  drivers: RouterOutputs["driver"]["getDrivers"];
}

export const DriversTable = ({ drivers }: DriversTableProps) => {
  console.log(drivers);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => (
          <TableRow key={driver.id}>
            <TableCell className="font-medium">{driver.fullName}</TableCell>
            <TableCell>{driver.phoneNumber}</TableCell>
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
