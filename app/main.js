requirejs.config({
    paths:{
        lib: '../lib',
        text: '../lib/text.2.0.15',
        vue: '../lib/vue.2.3.3',
        vueRouter: '../lib/vue-route',
        vuex: '../lib/vuex',
        jquery: '../lib/jquery-3.2.1',
        css: '../lib/css',
        iview: '../lib/iview',
        app: './app'
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

require(['require','./app'],function(require, app){ 
    var _app = app.createApp();
    require(['./layout'],function(layout){
        //如果是异步获取导航数据，需要在此做异步获取并通过vuex来更新导航 
        var initMenu = function() {
            app.getVue().$store.dispatch('root', {id:'mainc', path: './test', thridpart: true, name: '业务组件', href: '/mainc', selected: false});
            app.getVue().$store.dispatch('root', {id:'tomato', path: '../dest/tomato.js', thridpart: true, name: '蕃茄', href: '/tomato', selected: false});
            app.getVue().$store.dispatch('root', {id:'ctitle', name: '标题', href: '/ctitle', selected: false});
            app.getVue().$store.dispatch('root', {id:'croute', name: '二级菜单', href: '/croute', selected: false});
        };
        _app.createContext().Vue.component('layoutdefault', layout.defaultlayout);
        _app.registerGlobalComponents(['title', 'route']).done(function(){
            var vue = _app.createVue();
            vue.$mount('#app');
            initMenu();
        });
    })
});
