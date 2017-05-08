requirejs.config({
    paths:{
        lib: '../lib',
        text: '../lib/text.2.0.15',
        vue: '../lib/vue.2.1.8',
        vueRouter: '../lib/vue-route',
        vuex: '../lib/vuex',
        jquery: '../lib/jquery-3.2.1',
        bootstrap: '../lib/bootstrap',
        css: '../lib/css'
    },
    map: {
        '*':{
            css: '../lib/css'
        }
    },
    shim:{
        bootstrap:{
            deps:[
                'jquery',
                'css!../skin/bootstrap.css'
            ]
        },
        vue: {
            deps:[
                'css!../skin/layout.css'
            ]
        }
    }
})


require(['./app'],function(app){
    var _app = app.createApp();
    _app.registerGlobalComponents(['title', 'route', 'layout/default']).done(function(){
        var vue = _app.createVue();
        vue.$mount('#app');
    });
});
