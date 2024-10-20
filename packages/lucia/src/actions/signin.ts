import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify } from "@node-rs/argon2";
import { z } from "zod";

import { db } from "@acme/db";

import { lucia } from "..";

const identifierValidation = z.string().min(3).max(255);
const passwordValidation = z.string().min(6).max(255);

export async function signin(formData: FormData) {
  "use server";
  const identifierFormData = formData.get("identifier");
  const passwordFormData = formData.get("password");

  const { error: errorIdentifier, data: identifier } =
    identifierValidation.safeParse(identifierFormData);
  const { error: errorPassword, data: password } =
    passwordValidation.safeParse(passwordFormData);

  if (errorIdentifier) {
    throw new Error("Username or email invalid");
  }

  if (errorPassword) {
    throw new Error("Password invalid");
  }

  const user = await db.query.User.findFirst({
    where: (q, { eq, or }) =>
      or(eq(q.email, identifier), eq(q.username, identifier)),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await verify(user.password, password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}
