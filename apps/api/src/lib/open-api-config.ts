import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";
import { join } from "path";

import { APIBindings } from "@/types";

import packageJson from "../../package.json";
import { BASE_PATH, IS_PRODUCTION } from "./constants";

export default function configureOpenAPI(
  app: OpenAPIHono<APIBindings>
): OpenAPIHono<APIBindings> {
  if (IS_PRODUCTION) {
    // In production, serve the pre-built openapi.json as static file
    app.get("/doc", async (c) => {
      try {
        // Use absolute path relative to the dist directory
        const filePath = join(process.cwd(), "dist", "public", "openapi.json");
        const file = Bun.file(filePath);
        const json = await file.json();
        return c.json(json);
      } catch (error) {
        console.error("Failed to load openapi.json:", error);
        console.error("Current working directory:", process.cwd());
        console.error(
          "Attempted path:",
          join(process.cwd(), "public", "openapi.json")
        );
        console.error(
          "Test path:",
          join(process.cwd(), "dist", "public", "openapi.json")
        );
        return c.json({ error: "OpenAPI spec not found" }, 500);
      }
    });
  } else {
    // In development, generate OpenAPI spec dynamically
    app.doc("/doc", {
      openapi: "3.0.0",
      info: {
        version: packageJson.version,
        title: "Bunplate (by CodeVille)"
      }
    });
  }

  // Scalar API Reference UI
  app.get(
    "/reference",
    Scalar(() => ({
      url: `${BASE_PATH}/doc`,
      theme: "default"
    }))
  );

  return app;
}
