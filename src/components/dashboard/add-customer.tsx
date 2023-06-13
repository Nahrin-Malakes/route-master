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

export const AddCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const apiUtils = api.useContext();
  const addCustomer = api.customer.add.useMutation();

  const handleSave = () => {
    addCustomer.mutate(
      {
        fullName,
        phoneNumber,
        email,
        address: {
          city,
          postalCode,
          street,
        },
      },
      {
        onSuccess() {
          void apiUtils.customer.invalidate();
          setFullName("");
          setPhoneNumber("");
          setEmail("");
          setCity("");
          setStreet("");
          setPostalCode("");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"}>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="test@test.com"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              type="city"
              placeholder="Afula"
              className="col-span-3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="street" className="text-right">
              Street
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Marva"
              className="col-span-3"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="postal-code" className="text-right">
              Postal Code
            </Label>
            <Input
              id="postal-code"
              type="text"
              placeholder="1876013"
              className="col-span-3"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={addCustomer.isLoading}
            onClick={handleSave}
            type="submit"
          >
            {addCustomer.isLoading ? (
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
