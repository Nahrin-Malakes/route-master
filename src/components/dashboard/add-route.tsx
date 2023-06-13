import { type Driver } from "@prisma/client";
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  MoreHorizontal,
  PlusCircle,
  User,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";

export const AddRoute = () => {
  const [driver, setDriver] = useState<Driver | null>();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const drivers = api.driver.getDrivers.useQuery();
  const addRoute = api.route.add.useMutation();

  const handleCreate = () => {
    addRoute.mutate({
      date: date?.toDateString() as string,
      driverId: driver?.id as string,
    });
  };

  return (
    <div className="z-50 flex w-96 flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none">
        <span className="text-muted-foreground">Add a new route</span>
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <User className="mr-2 h-4 w-4" />
                Assign to...
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Drivers label..."
                    autoFocus={true}
                  />
                  <CommandList>
                    <CommandEmpty>No label found.</CommandEmpty>
                    <CommandGroup>
                      {drivers.data &&
                        drivers.data.map((driver) => (
                          <CommandItem
                            key={driver.id}
                            onSelect={() => {
                              setDriver(driver);
                            }}
                          >
                            {driver.fullName}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Set due date...
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleCreate()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
