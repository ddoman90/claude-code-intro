import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "./db";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: {
    type: "sqlite",
    db: getDb(),
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
