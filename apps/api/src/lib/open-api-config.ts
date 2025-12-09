import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

import { APIBindings } from "@/types";

import packageJson from "../../package.json";
import { BASE_PATH, IS_PRODUCTION } from "./constants";

// Dynamically import the generated spec only in production
let cachedOpenAPISpec: any = null;

if (IS_PRODUCTION) {
  try {
    // Import the generated spec module
    const { openAPISpec } = await import("../generated-openapi-spec");
    cachedOpenAPISpec = openAPISpec;
    console.log("✓ OpenAPI spec loaded from generated module");
  } catch (error) {
    console.error("⚠️ Failed to load generated OpenAPI spec:", error);
  }
}

export default function configureOpenAPI(
  app: OpenAPIHono<APIBindings>
): OpenAPIHono<APIBindings> {
  if (IS_PRODUCTION) {
    // In production, serve the cached OpenAPI spec
    app.get("/doc", (c) => {
      if (cachedOpenAPISpec) {
        return c.json(cachedOpenAPISpec);
      }
      return c.json({ error: "OpenAPI spec not found" }, 500);
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
