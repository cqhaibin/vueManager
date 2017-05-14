import main from './main.vue';

export default {
    install: function(cxt){
        cxt.Vue.component('mainc', main);
        cxt.router.addRoutes([{
            path: '/mainc',
            component: main
        }]);
    }
}