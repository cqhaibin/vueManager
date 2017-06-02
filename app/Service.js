/**
 * 服务管理容器
 */
define(['./app'], function(app) {
    var Service = {
        services: {},
        install: function(Vue, opts){
            Vue.prototype.$service = this.services;
        },
        registerService: function(serviceName, service){
            if(this.services[serviceName]){
                //已存在抛出日志，且不在注册 
                return;
            }
            this.services[serviceName] = service;
        }
    };

    return Service;
});