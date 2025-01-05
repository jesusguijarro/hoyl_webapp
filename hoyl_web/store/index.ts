import Vuex, { Store } from "vuex";
import UserModule from "./modules/user.module";
import AuthModule from "./modules/auth.module";

export interface RootState {}
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: () => {},
  },
  modules: {
    AuthModule,
    UserModule
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
