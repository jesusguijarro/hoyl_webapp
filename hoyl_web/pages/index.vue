<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col class="pt-0 pb-2" xl="4" md="6" lg="6" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" rounded="lg">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-subtitle class="v-card-subtitle">
                <h3 class="text-center minecraft-font" style="color: rgba(184, 116, 72, 1); font-size: 32px;">
                  HOYL
                </h3>
                <br />
                <h5 class="text-center minecraft-font" style="color: rgba(198, 125, 77, 1); font-size: 24px;">
                  Iniciar Sesión
                </h5>
              </v-card-subtitle>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field v-model="datalogin.email" label="Correo eléctronico"
                    :rules="[rules.required, rules.email]" prepend-inner-icon="mdi-email" outlined
                    clearable></v-text-field>
                  <v-text-field v-model="datalogin.password" label="Contraseña" :rules="[rules.required, rules.min]"
                    prepend-inner-icon="mdi-lock" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'" outlined clearable
                    @click:append="show1 = !show1"></v-text-field>
                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-alert v-if="errorMessage" outlined dense type="error">
                        {{ errorMessage }}
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-btn class="mx-auto col-md-11 minecraft-font" color="primary" dense block
                        @click="handleLogin()">
                        Iniciar Sesión
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { LoginInput } from "~/gql/graphql";

const Auth = namespace("AuthModule");

@Component({
  layout(context) {
    return "default";
  },
})
export default class Login extends Vue {
  public show1 = false;
  public datalogin: LoginInput = {
    email: "",
    password: "",
  };
  public rules = {
    required: (value: string) => !!value || "Campo obligatorio.",
    min: (v: string) => v.length >= 5 || "Mínimo 5 caracteres.",
    email: (v: string) =>
      /.+@.+\..+/.test(v) || "El correo electrónico no es válido.",
  };

  @Auth.State("errorMessage")
  public errorMessage?: string;

  @Auth.Action
  private login!: (data: LoginInput) => Promise<void>;

  async handleLogin() {
    await this.login(this.datalogin);
  }
}
</script>

<style scoped lang="scss">
.minecraft-font {
  font-family: 'Minecraft', sans-serif;
}

.v-card {
  background: rgba(255, 255, 255, 0.468) !important;
}

.v-card-title {
  display: block !important;
}

.img {
  height: 22px;
  max-width: 15px;
}

.img-f {
  height: 18px;
  max-width: 15px;
}
</style>
