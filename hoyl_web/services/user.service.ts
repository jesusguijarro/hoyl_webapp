import { apolloClient } from "@/provider/apolloprovider";
import {
    Answers,
    Player,
    Players,
    DeleteManyPlayerAndAnswers,
} from "~/gql/graphql";

class UserService {
  async getPlayers() {
    return (
      await apolloClient.query({
        query: Players,
        fetchPolicy: "network-only",
      })
    ).data.players;
  }
  async getplayer(userName: string) {
    return (
      await apolloClient.query({
        query: Player,
        fetchPolicy: "network-only",
        variables: {
          username: userName
        }
      })
    ).data.player;
  }
  async getAnsewrs() {
    return (
      await apolloClient.query({
        query: Answers,
        fetchPolicy: "network-only",
      })
    ).data.answers;
  }
   async deleteUsers(usernames: string | string[]): Promise<boolean> {
  const usernamesArray = Array.isArray(usernames) ? usernames : [usernames];
  console.log("Mutación:", usernamesArray);
  
  try {
    const response = await apolloClient.mutate({
      mutation: DeleteManyPlayerAndAnswers,
      variables: { usernames: usernamesArray },
    });
    console.log("Respuesta del servidor:", response);
    return true;
  } catch (error) {
    console.error("Error en la mutación:", error);
    return false;
  }
}

}
export default new UserService();