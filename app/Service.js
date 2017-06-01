/**
 * 服务管理容器
 */
define(['./app'], function(app) {
    var Service = {
        services: {},
        install: function(Vue, opts){
            Vue.prototype.$Services = this.services;
        },
        registerService: function(serviceName, service){
            this.services[serviceName] = service;
        }
    };

    return Service;
});