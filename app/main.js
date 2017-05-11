requirejs.config({
    paths:{
        lib: '../lib',
        text: '../lib/text.2.0.15',
        vue: '../lib/vue.2.1.8',
        vueRouter: '../lib/vue-route',
        vuex: '../lib/vuex',
        jquery: '../lib/jquery-3.2.1',
        bootstrap: '../lib/bootstrap',
        css: '../lib/css',
        iview: '../lib/iview'
    },
    map: {
        '*':{
            css: '../lib/css'
        }
    },
    shim:{
        bootstrap:{
            deps:[
                'jquery'
            ]
        },
        vue: {
            deps:[
                'css!../skin/main.css'
            ]
        },
        iview: {
            deps: [
                'css!../skin/iview.css'
            ]
        }
    }
})


require(['./app', './test'],function(app, test){
    var _app = app.createApp();
    _app.registerGlobalComponents(['title', 'route', 'layout/default']).done(function(){
        var vue = _app.createVue();
        debugger
        var cxt = _app.createContext();
        test.install(cxt);
        vue.$mount('#app');
    });
});
