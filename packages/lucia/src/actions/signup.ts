import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash } from "@node-rs/argon2";
import { z } from "zod";

import { db, User } from "@acme/db";

import { lucia } from "..";

const userValidation = z.string().min(3).max(31);
const emailValidation = z.string().email();
const passwordValidation = z.string().min(6).max(255);

export async function signup(formData: FormData) {
  "use server";
  const usernameFormData = formData.get("username");
  const emailFormData = formData.get("email");
  const passwordFormData = formData.get("password");

  const { error: errorUsername, data: username } =
    userValidation.safeParse(usernameFormData);
  const { error: errorEmail, data: email } =
    emailValidation.safeParse(emailFormData);
  const { error: errorPassword, data: password } =
    passwordValidation.safeParse(passwordFormData);

  if (errorUsername) {
    throw new Error("Username invalide");
  }

  if (errorEmail) {
    throw new Error("Email invalide");
  }

  if (errorPassword) {
    throw new Error("Password invalide");
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userUserName = (
    await db.query.User.findFirst({
      where: (q, { eq }) => eq(q.username, username),
    })
  )?.username;

  if (userUserName) {
    throw new Error("Username already taken");
  }

  const userEmail = (
    await db.query.User.findFirst({
      where: (q, { eq }) => eq(q.email, email),
    })
  )?.email;

  if (userEmail) {
    throw new Error("Username already taken");
  }

  const user = await db
    .insert(User)
    .values({
      username,
      email,
      password: passwordHash,
    })
    .returning();

  if (!user[0]) {
    throw new Error("Error creating user");
  }

  const { password: _, ...rest } = user[0];

  const session = await lucia.createSession(rest.id, { ...rest });
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}
