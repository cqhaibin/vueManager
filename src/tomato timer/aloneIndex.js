import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import iview from  'iview';
import Service from '../master/service';

import tomato from './tomato.vue';
import TomatoService from './service';
import tomatostore from './store';
import localStorage from './localStorage';

Vue.use(Vuex);
Vue.use(iview);
Vue.use(Service);

let store = new Vuex.Store();

var vue = new Vue({
    store: store,
    components:{
        tomato
    }
});

vue.$store.registerModule("tomato", tomatostore); //先注册存储，再注册服务
Service.registerService("tomato", new TomatoService(vue.$store, new localStorage()));

vue.$mount("#app");
