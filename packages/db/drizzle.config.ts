import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

// const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: "./src/introspect/schema.ts",
  out: "./src/introspect/",
  dialect: "postgresql",
  dbCredentials: { url: process.env.POSTGRES_URL },
  casing: "snake_case",
  strict: true,
} satisfies Config;
