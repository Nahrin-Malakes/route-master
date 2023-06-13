import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import fetch from "node-fetch";

import { env } from "@/env.mjs";

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Root {
  results: [
    {
      geometry: {
        location: {
          lat: string;
          lng: string;
        };
      };
    }
  ];
  status: string;
}

async function getLatLng(address: string): Promise<Coordinates> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${env.MAPS_API_SECRET}`;

    const response = await fetch(url);
    const data = (await response.json()) as Root;

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error("Geocoding API request failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      latitude: "0",
      longitude: "0",
    };
  }
}

export const customerRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        phoneNumber: z.string(),
        email: z.string(),
        address: z.object({
          city: z.string(),
          street: z.string(),
          postalCode: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const getCustomer = await ctx.prisma.customer.findMany({
        where: {
          OR: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
        },
      });
      if (getCustomer.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Customer already exists with the given phone number or email.",
        });
      }

      const { latitude, longitude } = await getLatLng(
        `${input.address.street}, ${input.address.city}`
      );
      if (!latitude || !longitude) {
      }

      const customer = await ctx.prisma.customer.create({
        data: {
          email: input.email,
          fullName: input.fullName,
          phoneNumber: input.phoneNumber,
          userId: ctx.session.user.id,
          address: {
            create: {
              city: input.address.city,
              street: input.address.street,
              postalCode: input.address.postalCode,
              coords: `${latitude},${longitude}`,
              userId: ctx.session.user.id,
            },
          },
        },
      });

      return { customer };
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const customers = await ctx.prisma.customer.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        address: true,
      },
    });

    return {
      customers,
    };
  }),
});
