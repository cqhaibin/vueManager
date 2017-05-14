define(['require','jquery', 'vue', 'vueRouter', 'vuex', 'iview'],function(require,$, Vue, VueRouter, Vuex, iview){
    require.onResourceLoad = function(context, map, depArray){
        //requirejs 文件load成功后的回调
    }

    /**
     * 构造函数
     */
    function App(){
        this.$components = [];
        this.$modulePrefix = './modules/';
        this.Vue = Vue; //Vue类对象
        this.Vuex = Vuex; //Vuex类对象
        this.router; //router实例对象
        this.vue; //vuex实例对象
        this.store; //存储实例对象
        this.init();
    }
    var apt = App.prototype;
    apt.init = function(){
        this.store = Object.create({
            modules:{}
        });        
        this.Vue.use(VueRouter);
        this.Vue.use(Vuex);
        this.Vue.use(iview);
        this.router = new VueRouter(); 
        this.store = new this.Vuex.Store(this.store);
    }
    /**
     * 创建一个给业务模块的上下文
     * @return object
     */
    apt.createContext = function(){
        return {
            Vue: this.Vue,
            router: this.router,
            $vue: this.vue
        };
    }
    apt.dfd = function(action){
        return action ? $.Deferred(action) : $.Deferred();
    }
    apt.isArray = function(val){
        return $.isArray(val);
    }
    /**
     * 加载业务模块或子模块核心方法
     * @param path string|Array 业务模块或子模块路径
     * @param promise
     */
    apt.acquire = function(path){
        var arrayPath;
        if(!this.isArray(path)){
            arrayPath = [path];
        }else{
            arrayPath = path;
        }
        var promise = this.dfd(function(dfd){
            require(arrayPath,function(){
                dfd.resolve(Array.prototype.slice.call(arguments));
            },function(error){
                dfd.reject(error);
            });
        }).promise();
        return promise;
    }
    /**
     * 创建一个vue实例
     * @return object vue实例
     */
    apt.createVue = function(){
        this.vue = new this.Vue({
            store: this.store,
            router: this.router
        });
        return this.vue;
    }
    /**
     * 根据组件名称创建组件模型对象(包含模板文件和类文件的组件)
     * @param componentName string 组件名称
     * @returns promise 返回值为promise
     */
    apt.createComponent = function(componentName){
        //可以重载，读取.vue的文件
        var path = this.$modulePrefix + componentName,
        html = 'text!' + path + '/index.html',
        js = path + '/index.js',
        self = this;
        var promise = this.acquire([html,js]);
        promise.done(function(result){
            var obj = result[1], content = result[0];
            obj.template = content;
            obj.__path__ = path;
            self.$components.push(obj);
        });
        return promise;
    }
    /**
     * 根据组件名称列表注册全局组件
     * @param componentNames Array 组件名称列表
     * @return promise
     */
    apt.registerGlobalComponents = function(componentNames){
        var gloadComponet = componentNames, self = this;
        var promises = gloadComponet.map(function(data,index){
            return self.createComponent(data);
        });
        var dfd = this.dfd();
        $.when.apply(null, promises).done(function(){
            var _router = [];
            self.$components.forEach(function(data,index){
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
    }

    var _app;

    return {
        createApp: function(){
            _app = new App();
            return _app;
        },
        getApp: function(){
            return _app;
        },
        getVue: function(){
            return _app.vue;
        }
    }
});