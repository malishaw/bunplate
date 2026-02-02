// @bun
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/auth/config.ts
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

// src/database/schema/auth.schema.ts
var exports_auth_schema = {};
__export(exports_auth_schema, {
  verifications: () => verifications,
  users: () => users,
  userRelations: () => userRelations,
  sessions: () => sessions,
  sessionRelations: () => sessionRelations,
  accounts: () => accounts,
  accountRelations: () => accountRelations
});
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
var users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date).notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires")
});
var sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by")
}, (table) => [index("sessions_userId_idx").on(table.userId)]);
var accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date).notNull()
}, (table) => [index("accounts_userId_idx").on(table.userId)]);
var verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date).notNull()
}, (table) => [index("verifications_identifier_idx").on(table.identifier)]);
var userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts)
}));
var sessionRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}));
var accountRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id]
  })
}));

// src/auth/config.ts
import { admin, openAPI } from "better-auth/plugins";
function configAuth(config) {
  const baseAuthInstance = betterAuth({
    trustedOrigins: ["http://localhost:3000"],
    database: drizzleAdapter(config.database, {
      provider: "pg",
      schema: exports_auth_schema,
      usePlural: true
    }),
    secret: config.secret,
    plugins: [admin(), openAPI(), ...config.plugins || []],
    emailAndPassword: {
      enabled: true
    }
  });
  return baseAuthInstance;
}

// src/auth/setup.ts
var authInstance;
function setupAuth(config) {
  if (authInstance) {
    return authInstance;
  }
  authInstance = configAuth(config);
  return authInstance;
}
function getAuth() {
  if (!authInstance) {
    throw new Error("Auth instance not initialized.");
  }
  return authInstance;
}
export {
  setupAuth,
  getAuth
};

//# debugId=0C9D6CDD745800B764756E2164756E21
