import {
  defaultShouldDehydrateQuery,
  type DehydrateOptions,
  type Query,
} from "@tanstack/react-query";

export const reactQueryDehydrateOptions: DehydrateOptions = {
  shouldDehydrateQuery: (query: Query) =>
    defaultShouldDehydrateQuery(query) || query.state.status === "pending",
};
