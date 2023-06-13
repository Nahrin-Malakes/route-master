import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const routeRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        driverId: z.string(),
        date: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const route = await ctx.prisma.route.create({
        data: {
          date: input.date,
          driverId: input.driverId,
          userId: ctx.session.user.id,
        },
      });

      return {
        route,
      };
    }),
  getAllAddresses: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.address.findMany();
  }),
  addAddress: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        routeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const customer = await ctx.prisma.customer.findUnique({
        where: {
          id: input.customerId,
        },
        include: {
          address: true,
        },
      });
      if (!customer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Customer not found",
        });
      }

      const updateRoute = await ctx.prisma.route.update({
        where: {
          id: input.routeId,
        },
        data: {
          addresses: {
            connect: {
              customerId: customer.id,
            },
          },
        },
      });

      return updateRoute;
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.route.findMany({
      include: {
        driver: true,
        addresses: true,
      },
    });
  }),
  get: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const route = await ctx.prisma.route.findUnique({
        where: {
          id: input.routeId,
        },
        include: {
          addresses: {
            include: {
              customer: true,
            },
          },
        },
      });
      if (!route) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Route not found",
        });
      }

      return {
        route,
      };
    }),
});
