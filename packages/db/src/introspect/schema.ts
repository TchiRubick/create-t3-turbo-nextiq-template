import { sql } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roles = pgEnum("roles", ["user", "modo", "admin", "sudo"]);

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const User = pgTable("user", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: t.varchar({ length: 255 }).notNull(),
  password: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  image: t.varchar({ length: 255 }),
}));

export const Session = pgTable("session", (t) => ({
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => User.id),
  expiresAt: t
    .timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    })
    .notNull(),
}));
