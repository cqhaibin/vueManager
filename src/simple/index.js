import main from './main.vue';

export default {
    install: function(cxt){
        cxt.Vue.component('mainc', main);
        cxt.router.addRoutes([{
            path: '/mainc',
            component: main
        }]);
        //注册 api和service做一个测试
    },
    activated: function(cxt){
        //激活事件
    }
}