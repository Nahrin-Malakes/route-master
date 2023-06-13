import dynamic from "next/dynamic";
import { type NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import { AddAddress } from "@/components/route/add-address";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MapWithNoSSR = dynamic(() => import("@/components/dashboard/map"), {
  ssr: false,
});

const Route: NextPage = () => {
  const router = useRouter();

  const route = api.route.get.useQuery({
    routeId: router.query.id as string,
  });

  return (
    <div className="flex flex-col pl-8 pt-4">
      <h1 className="text-4xl">Route</h1>
      <div className="pt-8">
        <AddAddress />
      </div>
      <div className="pt-8">
        <Table>
          <TableCaption>A list of your {"route's"} addresses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">City</TableHead>
              <TableHead className="w-[100px]">Street</TableHead>
              <TableHead className="w-[100px]">Postal Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {route.data &&
              route.data.route.addresses.map((address) => (
                <TableRow key={address.id}>
                  <TableCell className="font-medium">{address.index}</TableCell>
                  <TableCell className="font-medium">
                    {address.customer.fullName}
                  </TableCell>
                  <TableCell className="font-medium">{address.city}</TableCell>
                  <TableCell className="font-medium">
                    {address.street}
                  </TableCell>
                  <TableCell className="font-medium">
                    {address.postalCode}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {route.data?.route.addresses && (
        <MapWithNoSSR addresses={route.data.route.addresses} />
      )}
    </div>
  );
};

export default Route;
