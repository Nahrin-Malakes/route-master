import { Separator } from "@/components/ui/separator";
import { UserMenu } from "@/components/user-menu";
import { type DefaultSession } from "next-auth";

interface NavbarProps {
  user: DefaultSession["user"];
}

export const Navbar = ({ user }: NavbarProps) => {
  if (!user?.email || !user.image || !user.name) return <></>;

  return (
    <div className="flex  flex-col">
      <div className="flex flex-row justify-between p-4">
        <h2 className="text-2xl">RouteMaster</h2>
        <UserMenu
          imageUrl={user.image}
          fallback={`${user.name.split(" ")[0]?.charAt(0) || ""} ${
            user.name.split(" ")[1]?.charAt(0) || ""
          }`}
        />
      </div>
      <Separator />
    </div>
  );
};
