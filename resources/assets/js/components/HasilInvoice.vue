<template>
    <v-content>
        <v-container>
        <v-layout row wrap>
        <v-flex sm3>
            <v-img contain  width="200" src="http://transcriptdoc.web.id/wp-content/uploads/2015/03/cropped-logo-panjang-header-1-e1499372818647-1.png"></v-img>
        </v-flex>
        <v-spacer></v-spacer>
        <v-layout column>
            <v-layout justify-end  class="font-weight-black">TranscriptDOC</v-layout>
            <v-layout justify-end >Jalan Belakang RSU III No, 11A,Klojen</v-layout>
            <v-layout justify-end>Malang, Jawa Timur 65111</v-layout>
            <v-layout justify-end>Indonesia</v-layout>
        </v-layout>
        </v-layout>
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-layout row wrap>
            <v-layout column >
                
                <v-layout column>
                    <div class="caption">
                <div >Bill to:</div>    
                </div>
                <div class="font-weight-black">{{nama}}</div>
                <div>{{kota}}, {{provinsi}}</div>
                <div>Indonesia</div>    
                </v-layout>
                
            </v-layout
            <v-spacer></v-spacer>
            <v-layout justify-end>
                <v-layout column wrap justify-start>
                    <v-layout row wrap>
                    <v-layout justify-end class="font-weight-black mb-2">Invoice Number:</v-layout>
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-layout justify-end>123</v-layout>    -->
                    </v-layout>
                    <v-layout row wrap>
                    <v-layout justify-end class="font-weight-black mb-2">Invoice Date:</v-layout>
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-layout justify-end>May 3,2015</v-layout>    -->
                    </v-layout>
                    <v-layout row wrap>
                    <v-layout justify-end class="font-weight-black mb-2">Due Date:</v-layout>
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-layout justify-end>May 11,2015</v-layout>    -->
                    </v-layout>
                    <v-layout>
                    <v-layout justify-end class="font-weight-black mb-2">Amount Due:</v-layout>
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-layout justify-end>Rp200,000.00</v-layout>    -->
                    </v-layout>
                    
                </v-layout>
                <v-layout column wrap justify-start>
                    <v-layout row wrap class="mb-2">
                    
                    <v-layout justify-end>{{invoiceId}}</v-layout>    
                    </v-layout>
                    <v-layout row wrap class="mb-2">
                    
                    <v-layout justify-end>{{invoiceDate}}</v-layout>    
                    </v-layout>
                    <v-layout row wrap class="mb-2">
                    
                    <v-layout justify-end>{{invoiceDue}}</v-layout>    
                    </v-layout>
                    <v-layout row wrap class="mb-2">
                    
                    <v-layout justify-end>Rp{{totalAmount}}</v-layout>    
                    </v-layout>
                    
                </v-layout>
            </v-layout>
            
        </v-layout>
        <v-divider class="mb-3 mt-2"></v-divider>
        <div style="overflow-x:auto;" class="mb-3">
    <table>
            <thead>
                <th><b>Product</b></th>
                <th><b>Qty</b></th>
                <th><b>Price</b></th>
                <th style="text-align:right !important;"><b>Amount</b></th>
            </thead>
            <tbody>
                <tr v-for="produk in produks">
                    <td v-html="produk.nama"></td>
                    <td>{{produk.qty}}</td>
                    <td>Rp{{produk.price}}</td>
                    <td style="text-align:right !important;">Rp{{produk.amount}}</td>
                </tr>
            </tbody>
        </table>    
</div>
<v-layout row wrap>
    <v-layout column justify-end>
          <v-layout row wrap justify-end class="mb-2">
              <b>Total:</b>
          </v-layout>
          <v-layout row wrap justify-end>
<b>Total paid:</b>
          </v-layout>
      </v-layout>
      <v-flex sm3>
      <v-layout column justify-end >
          <v-layout row wrap justify-end class="mb-2">
              Rp{{totalAmount}}
          </v-layout>
          <v-layout justify-end row wrap>
Rp0.00
          </v-layout>
      </v-layout>    
      </v-flex>
      
</v-layout>
      
        <v-layout justify-end class="mt-4" style="text-align:right">
            <v-layout column>
           <v-layout column >
               <div class="title">Amount due</div>
           </v-layout>
           <v-layout column >
               <div class="headline"><b>Rp{{totalAmount}}</b></div>
           </v-layout>     
            </v-layout>
           
        </v-layout>  
      
        <v-layout style="background-color:#f2f2f2;color:#BDBDBD; " class="pa-2">
            Thank you for your business
        </v-layout>
        
        </v-container>
        
    </v-content>
</template>
<script>
    import PouchDB from 'pouchdb-browser'
var db = new PouchDB('mydb');
import numeral from 'numeral'
export default {
    props: {id:String},
    mounted(){
        var vm=this
        db.get(this.id).then(a=>{
            const month=["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
            vm.nama=a.nama
            vm.kota=a.kota
            vm.provinsi=a.provinsi
            vm.invoiceId=a._id
            vm.invoiceDate=month[parseInt(a.invoiceDate.split("-")[1])]+" "+a.invoiceDate.split("-")[2]+","+a.invoiceDate.split("-")[0]
            vm.invoiceDue=month[parseInt(a.dueDate.split("-")[1])]+" "+a.dueDate.split("-")[2]+","+a.dueDate.split("-")[0]
            vm.totalAmount=numeral(a.produk.reduce((accumulator, currentValue) => accumulator.amount + currentValue.amount)).format('0,0.00');
            vm.produks=a.produk.map(z=>({amount:z.amount,qty:z.qty,nama:z.nama,price:numeral(z.price).format('0,0.00'),amount:numeral(z.amount).format('0,0.00')}))
            // console.log(a)
        })
    },
    data:()=>({
        nama:"",
        kota:"",
        provinsi:"",
        invoiceId:"",
        invoiceDate:"",
        invoiceDue:"",
        totalAmount:0,
        produks:[],
        
    })
}
</script>
<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  
}

th, td {
  text-align: left;
  padding: 8px;
}

tr{background-color: #f2f2f2}
</style>