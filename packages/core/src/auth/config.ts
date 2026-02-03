import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import { type Database } from "../database";
import * as authSchema from "../database/schema/auth.schema";
import { admin, openAPI } from "better-auth/plugins";

export interface AuthConfigurations {
  database: Database;
  secret?: string;
  plugins?: Parameters<typeof betterAuth>[0]["plugins"];
}

export function configAuth(config: AuthConfigurations) {
  const baseAuthInstance = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
      "http://localhost:3000",
      "https://bunplate-web.vercel.app"
    ],

    database: drizzleAdapter(config.database, {
      provider: "pg",
      schema: authSchema,
      usePlural: true
    }),
    secret: config.secret,
    plugins: [admin(), openAPI(), ...(config.plugins || [])],

    emailAndPassword: {
      enabled: true
    },

    advanced: {
      crossSubDomainCookies: {
        enabled: true
      }
    }
  });

  return baseAuthInstance;
}

export type AuthInstance = ReturnType<typeof configAuth>;
