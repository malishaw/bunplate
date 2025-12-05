import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

// Middleware
app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: "Hello from Bunplate API!" });
});

export default app;
