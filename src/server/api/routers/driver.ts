import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const driverRouter = createTRPCRouter({
  addDriver: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const driver = await ctx.prisma.driver.create({
        data: {
          userId: ctx.session.user.id,
          fullName: input.fullName,
          phoneNumber: input.phoneNumber,
        },
      });

      return { driver };
    }),
  getDrivers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.driver.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
