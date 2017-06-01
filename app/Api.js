/**
 * api管理容器
 */
define(['./app'], function(app) {
    var Api = {
        Apis: {},
        install: function(Vue, opts){
            Vue.prototype.$Apis = this.Apis;
        },
        registerService: function(ApiName, api){
            this.Apis[ApiName] = api;
        }
    };

    return Api;
});