import { TRPCError } from "@trpc/server";

import { eq, User, zUpdateUser } from "@acme/db";

import { protectedProcedure } from "../trpc";

export const userRouter = {
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.User.findFirst({
      where: eq(User.id, ctx.session.user.id),
    });
  }),
  update: protectedProcedure
    .input(zUpdateUser)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(User)
        .set({
          username: input.username,
        })
        .where(eq(User.id, ctx.session.user.id))
        .returning();

      if (!result[0]) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to update user",
        });
      }

      return { success: true };
    }),
};
