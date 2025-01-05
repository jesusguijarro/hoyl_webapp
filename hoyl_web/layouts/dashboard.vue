<template>
  <v-app>
    <template>
      <v-app-bar color="primary" dark app>
        <v-spacer></v-spacer>

        <v-toolbar-title class="minecraft-font">
          HOYL
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="logOut()">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
    </template>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

const Auth = namespace("AuthModule");

@Component
export default class Dashboard extends Vue {
  @Auth.Action
  private logOut!: () => void;
}
</script>

<style scoped lang="scss">
.minecraft-font {
  font-family: 'Minecraft', sans-serif;
}

a {
  color: white !important;
  text-decoration: none !important;
}
</style>
