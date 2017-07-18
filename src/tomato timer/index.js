import tomato from './tomato.vue';
import Service from './service';
import store from './store';
import localStorage from './localStorage';

export default {
    install: function(cxt){
        cxt.Vue.component("tomatoTimer", tomato);
        cxt.router.addRoutes([{
            path: '/tomato',
            component: tomato
        }]);
        cxt.service.registerService("tomato", new Service(cxt.$vue.$store, new localStorage()));
        cxt.$vue.$store.registerModule("tomato", store);
    }
}