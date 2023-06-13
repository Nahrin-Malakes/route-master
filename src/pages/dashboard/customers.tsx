import { type NextPage } from "next";

import { api } from "@/utils/api";
import { AddCustomer } from "@/components/dashboard/add-customer";
import { CustomersTable } from "@/components/dashboard/customers-table";

const Customers: NextPage = () => {
  const customers = api.customer.getAll.useQuery();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-col pl-8 pt-4">
        <h1 className="text-4xl">Customers</h1>
        <div className="pt-8">
          <AddCustomer />
        </div>
        <div className="pt-4">
          {customers.data && <CustomersTable customers={customers.data} />}
        </div>
      </div>
    </div>
  );
};

export default Customers;
