import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

// Import at module-level for faster cold starts
import { initDatabase } from "core/database";
import type { Database } from "core/database";
// import { getAuth, setupAuth } from "core/auth/setup";

// Module-level initialization - runs during cold start
let db: Database;

try {
  // Initialize database connection at module load
  db = initDatabase(process.env.DATABASE_URL!);

  // Initialize authentication at module load
  // setupAuth({
  //   database: db,
  //   secret: process.env.BETTER_AUTH_SECRET!
  // });
} catch (error) {
  console.error("Failed to initialize database/auth:", error);
  throw error;
}

// Middleware
app.use("*", logger());

// app.on(["POST", "GET"], "/api/auth/*", (c) => {
//   const auth = getAuth();
//   return auth.handler(c.req.raw);
// });

app.get("/", async (c) => {
  const result = await db.execute(`select 'hello world' as text`);

  return c.json({
    message: "Hello from Bunplate API!",
    dbResult: result.rows[0]
  });
});

export default app;
