import { apolloClient } from "@/provider/apolloprovider";
import {
  CurrentUser,
  Login,
  LoginInput,
  Users,
} from "~/gql/graphql";

class AuthService {
  async login(data: LoginInput) {
    return (
      await apolloClient.mutate({
        mutation: Login,
        variables: {
          input: data,
        },
      })
    ).data.login;
  }
  async getUsers() {
    return (
      await apolloClient.query({
        query: Users,
        fetchPolicy: "network-only",
      })
    ).data.users;
  }
}
export default new AuthService();