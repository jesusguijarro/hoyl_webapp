import { ENDPOINT_URL } from "~/utils/constants";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

import fetch from "cross-fetch";
import Cookie from "cookie-universal";
import { setContext } from "@apollo/client/link/context";

function createLink() {
  const httpLink = new HttpLink({
    uri: ENDPOINT_URL,
    fetch,
  });
  const authLink = setContext((_, { headers }) => {
    const cookies = Cookie();
    console.log("hola ");
    console.log(cookies);
    const token = cookies.get("token");
    console.log(token);
    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
    };
  });
  return authLink.concat(httpLink);
}

export const apolloClient = new ApolloClient({
  link: createLink(),
  cache: new InMemoryCache(),
});