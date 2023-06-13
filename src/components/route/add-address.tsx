import { useState } from "react";
import type { Customer, Route } from "@prisma/client";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const AddAddress = () => {
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [route, setRoute] = useState<Route | undefined>();

  const apiUtils = api.useContext();
  const addAddress = api.route.addAddress.useMutation();
  const customers = api.customer.getAll.useQuery();
  const routes = api.route.getAll.useQuery();

  const handleSave = () => {
    if (customer && route) {
      addAddress.mutate(
        {
          customerId: customer.id,
          routeId: route.id,
        },
        {
          onSuccess() {
            void apiUtils.route.invalidate();
            setRoute(undefined);
            setCustomer(undefined);
          },
        }
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"}>Add Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Command>
            <CommandInput placeholder="Search Customer..." autoFocus={true} />
            <CommandList>
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup>
                {customers.data &&
                  customers.data.customers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      onSelect={() => {
                        setCustomer(customer);
                      }}
                    >
                      {customer.fullName}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Command>
            <CommandInput placeholder="Search Route..." autoFocus={true} />
            <CommandList>
              <CommandEmpty>No route found.</CommandEmpty>
              <CommandGroup>
                {routes.data &&
                  routes.data.map((route) => (
                    <CommandItem
                      key={route.id}
                      onSelect={() => {
                        setRoute(route);
                      }}
                    >
                      {route.driver.fullName} - {route.date}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <DialogFooter>
          <Button
            disabled={addAddress.isLoading}
            onClick={handleSave}
            type="submit"
          >
            {addAddress.isLoading ? (
              <div>
                <Loader2 className="pr-2" /> Loading
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
