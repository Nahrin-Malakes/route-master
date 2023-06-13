import { type NextPage } from "next";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Route Master
          </h1>
          <div className="">
            <Button
              onClick={() =>
                void signIn("discord", { callbackUrl: "/dashboard" })
              }
              variant={"outline"}
            >
              Try now
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
