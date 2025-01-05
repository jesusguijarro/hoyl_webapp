<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col class="pt-0 pb-2" xl="8" md="10" lg="10" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" rounded="lg minecraft-font">
          <v-card-subtitle class="v-card-subtitle">
            <h3 class="text-center minecraft-font" style="color: rgba(184, 116, 72, 1); font-size: 32px;">
              Listado de Jugadores
            </h3>
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="space-between" class="mb-4">
              <v-col cols="12" md="6" sm="6" class="d-flex">
                <!-- <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
                  min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="startDate" label="Fecha de inicio" prepend-icon="mdi-calendar" clearable
                      @click:clear="startDate = null" readonly v-bind="attrs" v-on="on" dense></v-text-field>
                  </template>
<v-date-picker v-model="startDate" no-title scrollable @input="menu1 = false"></v-date-picker>
</v-menu>

<v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="endDate" label="Fecha de fin" prepend-icon="mdi-calendar" clearable
                      @click:clear="endDate = null" readonly v-bind="attrs" v-on="on" dense></v-text-field>
                  </template>
  <v-date-picker v-model="endDate" no-title scrollable @input="menu2 = false"></v-date-picker>
</v-menu>-->
              </v-col>
              <v-col cols="12" md="4" sm="6" class="d-flex justify-end">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar por nombre" single-line
                  hide-details dense class="search-field"></v-text-field>
              </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="filteredPlayers" item-value="username" v-model="selectedItems"
              item-key="id">
              <template v-slot:header.checkbox>
                <v-checkbox :value="allSelected" @click="toggleSelectAll" class="minecraft-font"
                  @change="logSelectedIds"></v-checkbox>
              </template>
              <template v-slot:item.checkbox="{ item }">
                <v-checkbox v-model="selectedItems" :value="item" class="minecraft-font"
                  @change="logSelectedIds"></v-checkbox>
              </template>
              <template v-slot:item.glutenfree="{ item }">
                <span v-if="item.glutenfree">Sí</span>
                <span v-else>No</span>
              </template>
            </v-data-table>
          </v-card-text>

          <v-row no-gutters justify="center" align="center" class="mt-4 minecraft-font">
            <v-col cols="4" class="pa-2">
              <v-btn class="mx-auto minecraft-font" color="primary" block @click="exportPDF">
                <v-icon left>mdi-file-pdf-box</v-icon> Exportar PDF
              </v-btn>
            </v-col>
            <v-col cols="4" class="pa-2">
              <v-btn class="mx-auto minecraft-font" color="primary" block @click="exportCSV">
                <v-icon left>mdi-file-excel</v-icon> Exportar CSV
              </v-btn>
            </v-col>
            <v-col cols="4" class="pa-2">
              <v-btn class="mx-auto minecraft-font" color="red" dark block @click="deleteSelected">
                <v-icon left>mdi-delete</v-icon> Eliminar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Player } from "~/gql/graphql";
import { exportPDF } from "~/utils/exportPDF";
import { exportCSV } from "~/utils/exportCSV";

const UserModule = namespace("UserModule");

@Component({
  layout(context) {
    return "dashboard";
  },
})
export default class Principal extends Vue {
  public selectedItems: any[] = [];
  public selectedIds: string[] = [];
  public selectednames: string[] = [];
  public search: string = "";
  public startDate: string | null = null;
  public endDate: string | null = null;
  public menu1 = false;
  public menu2 = false;

  @UserModule.State("players")
  private players!: Player[];

  @UserModule.Action
  fetchPlayers!: () => Promise<void>;
  @UserModule.Action
  getPlayer!: (id: string) => Promise<void>;
  @UserModule.Action
  deletePlayer!: (username: string[]) => Promise<void>;


  public headers = [
    { text: "Nombre", value: "username" },
    { text: "Edad", value: "age" },
    { text: "Genero", value: "appearance" },
    { text: "Select", value: "checkbox" },
  ];

  get filteredPlayers() {
    if (!Array.isArray(this.players)) {
      console.warn("Lista de jugadores no válida. Intentando recargar...");
      return [];
    }

    const searchLower = this.search.toLowerCase();
    return this.players
      .filter((player) => player.username.toLowerCase().includes(searchLower))
      .sort((a, b) => parseInt(a.id) - parseInt(b.id));
  }

  get allSelected() {
    return this.selectedItems.length === this.filteredPlayers.length && this.selectedItems.length > 0;
  }
  async logSelectedIds() {
    this.selectedIds = this.selectedItems.map((item) => item.id);
    this.selectednames = this.selectedItems.map((item) => item.username);
    console.log("IDs seleccionados:", this.selectedIds);
    console.log("names seleccionados:", this.selectednames);
  }
  toggleSelectAll() {
    if (this.allSelected) {
      // Deseleccionar todos los elementos
      this.selectedItems = [];
      this.selectednames = [];
      this.selectedIds = [];
    } else {
      // Seleccionar todos los elementos filtrados
      this.selectedItems = [...this.filteredPlayers];
      this.selectednames = this.selectedItems.map((item) => item.username);
      this.selectedIds = this.selectedItems.map((item) => item.id);
    }
    console.log("IDs seleccionados:", this.selectedIds);
    console.log("names seleccionados:", this.selectednames);
  }


  exportPDF() {
    exportPDF(this.selectedItems, this.startDate, this.endDate);
  }

  exportCSV() {

    exportCSV(this.selectedItems);
  }

  async deleteSelected() {
    await this.deletePlayer(this.selectednames);
  }


  async mounted() {
    await this.fetchPlayers();

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

.search-field {
  width: 100%;
}
</style>
