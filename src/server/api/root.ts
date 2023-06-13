import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { driverRouter } from "@/server/api/routers/driver";
import { customerRouter } from "@/server/api/routers/customer";
import { routeRouter } from "@/server/api/routers/route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  driver: driverRouter,
  customer: customerRouter,
  route: routeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
