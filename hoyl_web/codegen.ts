import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8081/graphql", //http://192.168.0.101:8083/graphql//http://localhost:8081/graphql //////////////////
  documents: "graphql/**/*.graphql",
  generates: {
    "gql/graphql.ts": {
      plugins: [
        "typescript-operations",
        "typescript-document-nodes",
        "typescript",
      ],
    },
    "gql/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
