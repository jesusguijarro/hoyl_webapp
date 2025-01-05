
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
  Auth,
  LoginInput,
  User,
  UsersQuery,
} from "~/gql/graphql";
import AuthService from "~/services/auth.service";

@Module({ namespaced: true })
class AuthModule extends VuexModule {
  public me?: User = undefined;
  public users?: UsersQuery[] = undefined;
  public loadingLoginStatus = false;
  public loadingUsersStatus = false;
  public errorMessage?: string = undefined;

  @Mutation
  public loginFaile(error: any) {
    if (error.message === "Datos de acceso incorrectos.") {
      this.errorMessage = "Credenciales incorrectas";
    } else if (error.message === "No User found") {
      this.errorMessage = "Usuario no encontrado";
    } else if (error.message === "Argument Validation Error") {
      this.errorMessage = "Argumentos Invalidos";
    } else {
      this.errorMessage = "A ocurrido un error";
    }
  }

  @Mutation
  public resetErrorMessage() {
    this.errorMessage = undefined;
  }

  @Mutation
  public removeCookies() {
    console.log("sesion cerrada");
    window.$nuxt.$cookies.remove("token");
    window.location.reload()
  }

  @Action({ rawError: true })
  logOut(): void {
    this.context.commit("removeCookies");
  }
  @Action
  async login(data: LoginInput) {
    this.context.commit("loadingLogin", true);
    this.context.commit("resetErrorMessage");
    return await AuthService.login(data)
      .then((auth: Auth) => {
        //console.log(auth);
        this.context.commit("loginSuccess", auth);
        this.context.commit("loadingLogin", false);
        window.$nuxt.$router.push("./PagPrin/Principal");
      })
      .catch((error) => {
        console.log(error.message);
        this.context.commit("loginFaile", error);
        this.context.commit("loadingLogin", false);
      });
  }
  @Mutation
  public userSuccess(user: User): void {
    //console.log(user);
    this.me = user;
  }
  @Mutation
  public loadingUser(status: boolean) {
    this.loadingLoginStatus = status;
  }
  @Mutation
  public loginSuccess(auth: Auth): void {
    // console.log(auth);
    window.$nuxt.$cookies.set("token", auth.token, {
      path: "/",
    });
  }

  @Mutation
  public loadingLogin(status: boolean) {
    this.loadingLoginStatus = status;
  }
  get isLoadingLogin(): boolean {
    return this.loadingLoginStatus;
  }
}
export default AuthModule;