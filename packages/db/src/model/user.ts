import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { User } from "../schema";

export const zInsertUser = createInsertSchema(User, {
  username: z.string(),
  email: z.string().email().readonly(),
});

export const zSelectUser = createSelectSchema(User).omit({
  password: true,
});

export const zUpdateUser = zInsertUser.pick({
  username: true,
});

export type InsertUser = z.infer<typeof zInsertUser>;

export type UpdateUser = z.infer<typeof zUpdateUser>;

export type UserSelect = z.infer<typeof zSelectUser>;
