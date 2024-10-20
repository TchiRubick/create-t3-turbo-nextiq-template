import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

import type { UserSelect } from "@acme/db";
import { db, Session, User } from "@acme/db";

const adapter = new DrizzlePostgreSQLAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      username: attributes.username,
      id: attributes.id,
      image: attributes.image,
      emailVerified: attributes.emailVerified,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserSelect;
  }
}

export const luciaPageProtector = async (redirectPath = "/") => {
  const luciaSession = await lucia.validateSession(
    cookies().get(lucia.sessionCookieName)?.value ?? "",
  );

  const { session } = luciaSession;

  if (session === null) {
    redirect(redirectPath);
  }

  if (session.expiresAt < new Date()) {
    redirect(redirectPath);
  }
};
