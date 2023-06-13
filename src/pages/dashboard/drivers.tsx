import { AddDriver } from "@/components/dashboard/add-driver";
import { DriversTable } from "@/components/dashboard/drivers-table";
import { api } from "@/utils/api";

const Drivers = () => {
  const drivers = api.driver.getDrivers.useQuery();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-col pl-8 pt-4">
        <h1 className="text-4xl">Drivers</h1>
        <div className="pt-8">
          <AddDriver />
        </div>
        <div className="pt-4">
          {drivers.data && <DriversTable drivers={drivers.data} />}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
