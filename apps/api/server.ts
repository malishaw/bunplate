import app from "./src/app";
import { serve } from "@hono/node-server";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

console.log(`API listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
