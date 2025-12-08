import { Scalar } from "@scalar/hono-api-reference";

import { OpenAPI } from "@/types";

import packageJson from "../../package.json";
import { BASE_PATH } from "./constants";

export default function configureOpenAPI(app: OpenAPI): void {
  app.doc31("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Bunplate (by CodeVille)"
    }
  });

  app.get(
    "/reference",
    Scalar({
      url: `${BASE_PATH}/doc`,
      theme: "default"
    })
  );
}
