import { Scalar } from "@scalar/hono-api-reference";

import { APIBindings } from "@/types";

import packageJson from "../../package.json";
import { BASE_PATH } from "./constants";
import { OpenAPIHono } from "@hono/zod-openapi";

export default function configureOpenAPI(
  app: OpenAPIHono<APIBindings>
): OpenAPIHono<APIBindings> {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Bunplate (by CodeVille)"
    }
  });

  app.get(
    "/reference",
    Scalar(() => ({
      url: `${BASE_PATH}/doc`,
      theme: "default"
    }))
  );

  return app;
}
