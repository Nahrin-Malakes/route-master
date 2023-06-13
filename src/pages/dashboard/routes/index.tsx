import { useRouter } from "next/router";
import { type NextPage } from "next";
import dynamic from "next/dynamic";

import { AddRoute } from "@/components/dashboard/add-route";
import { api } from "@/utils/api";
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

const Routes: NextPage = () => {
  const router = useRouter();

  const { data } = api.route.getAll.useQuery();

  console.log(data);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-col pl-8 pt-4">
        <h1 className="text-4xl">Routes</h1>
        <div className="pt-8">
          <AddRoute />
          <div className="pt-4">
            <div className="z-10 h-5 w-96">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Driver</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Addresses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.map((route) => (
                      <TableRow
                        onClick={() => {
                          void router.push(`/dashboard/routes/${route.id}`);
                        }}
                        key={route.id}
                      >
                        <TableCell className="font-medium">
                          {route.driver.fullName}
                        </TableCell>
                        <TableCell>{route.date}</TableCell>
                        <TableCell>{route.addresses.length + 1}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {/* {data && <MapWithNoSSR addresses={data} />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
