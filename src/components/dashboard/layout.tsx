import { type ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type LayoutProps = {
  className?: ClassNameValue;
  children?: ReactNode;
};

export const Layout = ({ children, className }: LayoutProps) => {
  const session = useSession();

  if (session.status == "unauthenticated" || !session.data?.user)
    return <>unauthenticated</>;

  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <Navbar user={session.data.user} />
      <div className="flex flex-row">
        <aside className="ml-4 flex flex-col">
          <Link className="pt-2 text-lg" href="/dashboard/drivers">
            Drivers
          </Link>
          <Link className="pt-2 text-lg" href="/dashboard/customers">
            Customers
          </Link>
          <Link className="pt-2 text-lg" href="/dashboard/routes">
            Routes
          </Link>
        </aside>
        <Separator orientation="vertical" className="ml-24 min-h-screen" />
        <div className="flex">{children}</div>
      </div>
    </div>
  );
};
