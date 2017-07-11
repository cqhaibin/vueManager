import tomato from './tomato.vue';

export default {
    install: function(cxt){
        cxt.Vue.component("tomatoTimer", tomato);
        cxt.router.addRoutes([{
            path: '/tomato',
            component: tomato
        }]);
    }
}