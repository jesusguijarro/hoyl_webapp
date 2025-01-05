import "@tsed/platform-express";
import "@tsed/typegraphql";
import { ExpressContext } from "apollo-server-express";
import { readFileSync } from "fs";
import { verify } from "jsonwebtoken";
import { ToDoContext } from "src/modules/user/models/context.model";
import * as modules from "./../modules";
import { customAuthChecker } from "./authchecker";
import { envs } from "./envs/index";
import loggerConfig from "./logger/index";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  typegraphql: {
    default: {
      path: "/graphql",
      buildSchemaOptions: {
        dateScalarMode: "isoDate",
        authChecker: customAuthChecker
      },
      introspection: true,
      resolvers: Object.values(modules) as any,
      context: (context: ExpressContext): ToDoContext => {
        const token = context.req.headers.authorization?.split(" ");
        if (token?.length == 2) {
          const payload = verify(token[1], process.env.SECRET ?? "ben") as any;
          return {
            user: payload
          };
        }
        return {};
      }
    }
  }
  // additional shared configuration
};
