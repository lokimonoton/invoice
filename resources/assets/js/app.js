
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

// window.Vue = require('vue');
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
Vue.use(Vuetify)
Vue.use(VueRouter)


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import Pembeli from './components/Pembeli'
import Produk from './components/Produk'
import Invoice from './components/Invoice'
import HasilInvoice from './components/HasilInvoice'
Vue.component('awal', require('./components/Awal.vue'));
Vue.component('hasil', HasilInvoice);
const routes = [
    { path: '/', component: Invoice },
  { path: '/pembeli', component: Pembeli },
  { path: '/produk', component: Produk },
  
]


const router = new VueRouter({
    mode:'history',
  routes // short for `routes: routes`
})
const app = new Vue({
    
    router,
    el: '#app'
});
