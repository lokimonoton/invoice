<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>TAMBAH INVOICE</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Invoice</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-flex  sm12>
                <v-select
                  :items="['Ibu', 'Bapak']"
                  label="Ibu/Bapak*"
                  required
                  v-model="prefix"
                ></v-select>
              </v-flex>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nama Depan" v-model="namaDepan"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                v-model="namaBelakang"
                  label="Nama Belakang"
                  
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Kota"
                  v-model="kota"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Provinsi"
                  v-model="provinsi"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                 <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
        :rules="[v => !!v || 'Item is required',v => v <= date2 || 'invoice data harus lebih kecil dari due date']"
          slot="activator"
          v-model="date"
          label="Invoice Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    
              </v-flex>
              <v-flex xs12>
                 <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date2"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
        :rules="[v => !!v || 'Item is required',v => v >= date || 'due data harus lebih besar dari invoice date']"
          slot="activator"
          v-model="date2"
          label="Due Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date2" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    
              </v-flex>
              <v-flex xs12>
                Product
              </v-flex>
              <v-flex sm3>
                <v-select
                  :items="['Transcription','Translation']"
                  label="Nama Produk*"
                  required
                  v-model="nama"
                ></v-select>
              </v-flex>
              <v-flex  sm3>
                <v-select
                v-model="jenis"
                  :items="['dalam Bahasa Indonesia','dalam Bahasa Inggris']"
                  label="Jenis Produk*"
                  required
                ></v-select>
              </v-flex>
              <v-flex  sm3 >
                <v-text-field  v-model="qty"   :rules="[v => !!v || 'Item is required',v => /^[0-9]*$/.test(v) || 'number only']" label="Quantity" ></v-text-field>
              </v-flex>
              <v-flex  sm3 >
                <v-text-field v-model="price" :rules="[v => !!v || 'Item is required',v => /^[0-9]*$/.test(v) || 'number only']" label="Price" ></v-text-field>
              </v-flex>
              <v-flex  sm3 >
                <v-text-field :value="amount = qty*price" v-model="amount" label="Amount" disabled ></v-text-field>
              </v-flex>
              <v-flex  sm3 >
                <v-btn color="primary" @click="tambahProduk">Tambah Produk</v-btn>
              </v-flex>
            </v-layout>
              <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right"  v-html="props.item.nama"></td>
      <td class="text-xs-right">{{ props.item.qty }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
      <td class="text-xs-right">{{ props.item.amount }}</td>
      <td class="text-xs-right"><v-btn color="primary" @click="deleteProduk(props.index)">DELETE</v-btn></td>
      
    </template>
  </v-data-table>
          </v-container>
          <!--<small>*indicates required field</small>-->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="tambah">Tambah</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--<v-btn @click="tambah">TAM</v-btn>-->
  </v-layout>
</template>
<script>
import PouchDB from 'pouchdb-browser'
var db = new PouchDB('mydb');
  export default {
    data: () => ({
      prefix:"",
      namaDepan:"",
      namaBelakang:"",
      kota:"",
      provinsi:"",
      headers: [
          { text: 'Product', value: 'nama', sortable: false },
          { text: 'Qty', value: 'qty', sortable: false },
          { text: 'Price', value: 'price', sortable: false },
          { text: 'Amount', value: 'amount', sortable: false },
          { text: 'ACTION', sortable: false },
          
        ],
        nama:"",
        jenis:"",
        qty:0,
        price:0,
        amount:0,
         desserts: [],
      qty:0,
      price:0,
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false
    }),
    methods:{
      tambahProduk(){
        this.desserts.push({nama:`<b>${this.nama}</b></br>${this.jenis}`,qty:this.qty,price:this.price,amount:this.amount})
      },
      deleteProduk(index){
        this.desserts.splice(index)
      },
      tambah(){
  var vm=this
          db.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  const jumlah=result.rows.length+1
  db.put({_id: jumlah.toString(),invoiceDate:vm.date,dueDate:vm.date2,produk:vm.desserts,nama:vm.prefix+" "+vm.namaDepan+" "+vm.namaBelakang,kota:vm.kota,provinsi:vm.provinsi})  
  vm.dialog=false
  // res.json({"users": result.rows});
}).catch(function (err) {
  console.log(err);
});
      
      
      }
    }
  }
</script>