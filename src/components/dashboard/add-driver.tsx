import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";

export const AddDriver = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const apiUtils = api.useContext();
  const addDriver = api.driver.addDriver.useMutation();

  const handleSave = () => {
    addDriver.mutate(
      {
        fullName,
        phoneNumber,
      },
      {
        onSuccess() {
          void apiUtils.driver.invalidate();
          setFullName("");
          setPhoneNumber("");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"}>Add Driver</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="name"
              className="col-span-3"
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone-number" className="text-right">
              Phone #
            </Label>
            <Input
              id="phone-number"
              type="tel"
              placeholder="###-#######"
              className="col-span-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={addDriver.isLoading}
            onClick={handleSave}
            type="submit"
          >
            {addDriver.isLoading ? (
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
