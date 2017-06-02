/**
 * api管理容器
 */
define(['./app'], function(app) {
    var Api = {
        Apis: {},
        install: function(Vue, opts){
            Vue.prototype.$api = this.Apis;
        },
        registerService: function(apiName, api){
            if(this.Apis[apiName]){
                //已存在抛出异常
                return;
            }
            this.Apis[apiName] = api;
        }
    };

    return Api;
});