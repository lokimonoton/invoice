<template>
    <v-layout>
           <v-flex sm12>
   <v-card>
              <v-card-text>
               <ModalForm></ModalForm>
              </v-card-text>
            <v-card-text>
                 <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item._id }}</td>
      <td class="text-xs-right">{{ props.item.nama }}</td>
      <td class="text-xs-right">{{ props.item.invoiceDate }}</td>
      <td class="text-xs-right">{{ props.item.dueDate }}</td>
      <td class="text-xs-right"><v-btn color="primary" @click="deleteDB(props.item._id)">DELETE</v-btn></td>
      <td class="text-xs-right"><v-btn color="primary" @click="buatInvoice(props.item._id)">buatInvoice</v-btn></td>
    </template>
  </v-data-table>
  
            </v-card-text>
            </v-card>
            </v-flex>
  </v-layout>
</template>
<script>
import ModalForm from './ModalForm'
import PouchDB from 'pouchdb-browser'
var db = new PouchDB('mydb');

  export default {
    mounted(){
      var vm=this
db.changes({ 
  live: true,
  include_docs: true
}).on('change', function (change) {
      db.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  console.log(result.rows)
  vm.desserts=result.rows.map(a=>a.doc)
  
}).catch(function (err) {
  console.log(err);
});
});
      db.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  console.log(result.rows)
  vm.desserts=result.rows.map(a=>a.doc)
  
}).catch(function (err) {
  console.log(err);
});
    },
    methods:{
      buatInvoice(id){
        window.location.href="/hasilinvoice?id="+id
      },
      deleteDB(index){
  var vm=this
        db.get(index).then(a=>{
          db.remove(a)
              db.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  vm.desserts=result.rows.map(a=>a.doc)
  
}).catch(function (err) {
  console.log(err);
});
        })
      }
    },
      components:{
        ModalForm:ModalForm  
      },
    data: () => ({
      dialog: false,
      headers: [
          { text: 'Invoice Id', value: '_id',sortable:false },
          { text: 'Nama', value: 'nama',sortable:false },
          { text: 'Invoice Date', value: 'invoiceDate',sortable:false },
          { text: 'Due Date', value: 'dueDate' ,sortable:false},
          { text: 'ACTION',sortable:false },
          { text: 'CREATE INVOICE',sortable:false }
        ],
        desserts: [
          
        ]
    })
  }
</script>