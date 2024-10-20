import type { TRPCRouterRecord } from "@trpc/server";

import { lucia } from "@acme/lucia";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  isLoggedIn: publicProcedure.query(({ ctx }) => {
    const session = ctx.session.session;

    if (!session) return false;

    if (session.expiresAt <= new Date()) return false;

    return true;
  }),
  user: protectedProcedure.query(({ ctx }) => ctx.session.user),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await lucia.invalidateSession(ctx.token ?? "");

    return { success: true };
  }),
} satisfies TRPCRouterRecord;
