import { isApolloError } from "@apollo/client/errors";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
    Answers,
    Player,
    Players,
    User,

} from "~/gql/graphql";
import UserService from "~/services/user.service";

@Module({ namespaced: true })
class UserModule extends VuexModule {
    public players?: Player[] = undefined;
    public users?: User[] = undefined;
    public id?: User | undefined = undefined;
    public user: User[] | null = null;
    public loadingdelete = false;
    public successdelete = false;
    public loadingPlayersStatus = false;
    public loadingPlayerStatus = false;

    @Action
    async getPlayer(userName: string) {
        this.context.commit("loadingPlayer", true);
        return await UserService.getplayer(userName)
            .then((data) => {
                console.log(data);
                this.context.commit("playerSuccess", data);
                this.context.commit("loadingPlayer", false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    @Mutation
    public playerSuccess(players: Player[]): void {
        this.players = players;
    }
    @Mutation
    public loadingPlayer(status: boolean) {
        this.loadingPlayerStatus = status;
    }
    @Action
async fetchPlayers() {
  this.context.commit("loadingPlayers", true);
  
  // Primera llamada para obtener los jugadores
  await UserService.getPlayers()
    .then((players: Player[]) => {
      console.log(players);
      this.context.commit("playersSuccess", players);
      this.context.commit("loadingPlayers", false);
    })
    .catch((error) => {
      console.log(error);
    });

  // Configura un intervalo para consultar nuevamente cada 5 segundos (o el tiempo que necesites)
  setInterval(async () => {
    await UserService.getPlayers()
      .then((players: Player[]) => {
        console.log(players);
        this.context.commit("playersSuccess", players);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 1000); // Reemplaza 5000 por el tiempo que necesites (en milisegundos)
}
    @Mutation
    public playersSuccess(players: Player[]): void {
        this.players = players;
    }
    @Mutation
    public loadingPlayers(status: boolean) {
        this.loadingPlayersStatus = status;
    }

    @Action({ rawError: true })
    async deletePlayer(username: string[]): Promise<void> {
       
    this.context.commit("setLoadingDelete", true);
    this.context.commit("setSuccessDelete", false);
    return await UserService.deleteUsers(username)
        .then((data) => {
            console.log("Llego");
            console.log(data);
            this.context.commit("setDelete", data);
            this.context.commit("setLoadingDelete", false);
            this.context.commit("setSuccessDelete", false); 
        })
        .catch((error) => {
            this.context.commit("setLoadingDelete", false);
            console.log(error);
        });
    }
    @Mutation
    public setLoadingDelete(status: boolean) {
        this.loadingdelete = status;
    }
    @Mutation
    public setSuccessDelete(status: boolean) {
        this.successdelete = status;
    }
    
    @Mutation
    public setDelete(data: { username: string[] }) {
        console.log("Llego setDelete");
        window.location.reload()
    if (this.players) {
        this.players = this.players.filter(
            (player) => !data.username.includes(player.username)
        );
        window.location.reload()
        }
        
    }

}
 

export default UserModule;