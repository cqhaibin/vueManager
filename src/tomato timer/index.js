import tomato from './tomato.vue';
import Service from './service';

export default {
    install: function(cxt){
        cxt.Vue.component("tomatoTimer", tomato);
        cxt.router.addRoutes([{
            path: '/tomato',
            component: tomato
        }]);
        cxt.service.registerService("tomato", new Service(cxt));
    }
}