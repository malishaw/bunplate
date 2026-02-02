import {
  adminClient,
  apiKeyClient,
  organizationClient
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Domain Configurations
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  plugins: [adminClient(), apiKeyClient(), organizationClient()],
  fetchOptions: {
    onError: (ctx) => {
      console.error(`BetterAuth Error: ${ctx.error.message}`);
    }
  }
});
