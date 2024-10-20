import { relations } from "drizzle-orm/relations";

import { Session, User } from "./schema";

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
