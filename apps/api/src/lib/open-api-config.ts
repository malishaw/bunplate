import { Scalar } from "@scalar/hono-api-reference";

import { APIBindings, OpenAPI } from "@/types";

import packageJson from "../../package.json";
import { BASE_PATH } from "./constants";
import { OpenAPIHono } from "@hono/zod-openapi";

export default function configureOpenAPI(app: OpenAPIHono<APIBindings>): void {
  app.doc31("/api/doc", {
    openapi: "3.1.0",
    info: {
      version: packageJson.version,
      title: "Bunplate (by CodeVille)"
    }
  });

  app.get(
    "/api/reference",
    Scalar(() => ({
      url: `${BASE_PATH}/doc`,
      theme: "default"
    }))
  );
}
