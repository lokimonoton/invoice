<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>TAMBAH PRODUK</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Produk</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nama Produk*" required></v-text-field>
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Jenis Produk*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Harga*"  required></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      dialog: false
    })
  }
</script>