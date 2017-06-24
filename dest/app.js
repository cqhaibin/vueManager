define(['require', 'jquery', 'vue', 'vueRouter', 'vuex', 'iview'], function (require, $, Vue, VueRouter, Vuex, iview) { 'use strict';

require = 'default' in require ? require['default'] : require;
$ = 'default' in $ ? $['default'] : $;
Vue = 'default' in Vue ? Vue['default'] : Vue;
VueRouter = 'default' in VueRouter ? VueRouter['default'] : VueRouter;
Vuex = 'default' in Vuex ? Vuex['default'] : Vuex;
iview = 'default' in iview ? iview['default'] : iview;

//框架服务层容器
var Service = {
    services: {},
    install: function install(Vue$$1, opts) {
        Vue$$1.prototype.$service = this.services;
    },
    registerService: function registerService(serviceName, service) {
        if (this.services[serviceName]) {
            //已存在抛出日志，且不在注册 
            return;
        }
        this.services[serviceName] = service;
    }
};

//框架Api
var Api = {
    Apis: {},
    install: function install(Vue$$1, opts) {
        Vue$$1.prototype.$api = this.Apis;
    },
    registerService: function registerService(apiName, api) {
        if (this.Apis[apiName]) {
            //已存在抛出异常
            return;
        }
        this.Apis[apiName] = api;
    }
};

//主框架

var _cahce = {}; //业务组件缓存

require.onResourceLoad = function (context, map, depArray) {}
//requirejs 文件load成功后的回调


/**
 * 构造函数
 */
;function App() {
    this.$components = [];
    this.$modulePrefix = './modules/';
    this.Vue = Vue; //Vue类对象
    this.Vuex = Vuex; //Vuex类对象
    this.router; //router实例对象
    this.vue; //vuex实例对象
    this.store; //存储实例对象
    this.service = Service; //服务容器
    this.api = Api; //对向api容器
    this.init();
}
var apt = App.prototype;
apt.init = function () {
    this.store = Object.create({
        modules: {}
    });
    this.Vue.use(VueRouter);
    this.Vue.use(Vuex);
    this.Vue.use(iview);
    this.Vue.use(this.service);
    this.Vue.use(this.api);
    this.router = new VueRouter();
    this.store = new this.Vuex.Store(this.store);
};
/**
 * 创建一个给业务模块的上下文
 * @return object
 */
apt.createContext = function () {
    return {
        Vue: this.Vue,
        router: this.router,
        $vue: this.vue,
        service: this.service,
        api: this.api
    };
};
apt.dfd = function (action) {
    return action ? $.Deferred(action) : $.Deferred();
};
apt.isArray = function (val) {
    return $.isArray(val);
};
/**
 * 加载业务模块或子模块核心方法
 * @param path string|Array 业务模块或子模块路径
 * @param promise
 */
apt.acquire = function (path) {
    var arrayPath;
    if (!this.isArray(path)) {
        arrayPath = [path];
    } else {
        arrayPath = path;
    }
    var promise = this.dfd(function (dfd) {
        require(arrayPath, function () {
            dfd.resolve(Array.prototype.slice.call(arguments));
        }, function (error) {
            dfd.reject(error);
        });
    }).promise();
    return promise;
};
/**
 * 创建一个vue实例
 * @return object vue实例
 */
apt.createVue = function () {
    this.vue = new this.Vue({
        store: this.store,
        router: this.router
    });
    return this.vue;
};
/**
 * 根据组件名称创建组件模型对象(包含模板文件和类文件的组件)
 * @param componentName string 组件名称
 * @returns promise 返回值为promise
 */
apt.createComponent = function (componentName) {
    //可以重载，读取.vue的文件
    var path = this.$modulePrefix + componentName,
        html = 'text!' + path + '/index.html',
        js = path + '/index.js',
        self = this;
    var promise = this.acquire([html, js]);
    promise.done(function (result) {
        var obj = result[1],
            content = result[0];
        obj.template = content;
        obj.__path__ = path;
        self.$components.push(obj);
    });
    return promise;
};
/**
 * 根据组件名称列表注册全局组件
 * @param componentNames Array 组件名称列表
 * @return promise
 */
apt.registerGlobalComponents = function (componentNames) {
    var gloadComponet = componentNames,
        self = this;
    var promises = gloadComponet.map(function (data, index) {
        return self.createComponent(data);
    });
    var dfd = this.dfd();
    $.when.apply(null, promises).done(function () {
        var _router = [];
        self.$components.forEach(function (data, index) {
            self.Vue.component(data.name, data);
            _router.push({
                path: '/' + data.name,
                component: data
            });
        });
        self.router.addRoutes(_router); //全局注册都注册为路由
        dfd.resolve(_router);
    });
    return dfd.promise();
};

/**
 * 加载或激活业务模块，在对应路径每次被选择都会执行此函数，所以缓存区分了是否已加载。
 * @param item 导航对象，可以是root，也可以是child
 * @param callback 加载完成执行的回调
 */
apt.loadThridPart = function (item, callback) {
    var self = this;
    if (item.thridpart && !_cahce[item.id]) {
        self.acquire(item.path).done(function (arg) {
            arg[0].install(self.createContext()); //安装，只执行一次（加载）
            if (arg[0].activated) {
                arg[0].activated(self.createContext()); //激活，每次业务模块被选择时执行
            }
            _cahce[item.id] = true;
            callback(item);
        });
    } else {
        var comp = require(item.path);
        if (comp.activated) {
            comp.activated(self.createContext());
        }
        callback(item);
    }
};

var _app;

var app = {
    createApp: function createApp() {
        _app = new App();
        return _app;
    },
    getApp: function getApp() {
        return _app;
    },
    getVue: function getVue() {
        return _app.vue;
    }
};

return app;

});
