define(['app'],function(app){
    var store = {
        route: { 
            state: {
                childs: [],
                roots: [{id:'ctitle', name: '标题', href: '/ctitle', selected: false},
                {id:'croute', name: '二级菜单', href: '/croute', selected: false},
                {id:'mainc', path: 'test', thridpart: true, name: '业务组件', href: '/mainc', selected: false}]
            },
            mutations: {
                childs: function(state, data){
                    state.childs = data;
                },
                selectRootItem: function(state, data){
                    var len = state.roots.length;
                    for(var irow = 0; irow < len; ++irow){
                        if(state.roots[irow].id === data.id){
                            state.roots[irow].selected = true;
                        } else {
                            state.roots[irow].selected = false;
                        }
                    }
                }
            },
            actions: {
                childs: function(state, data){
                    state.commit('childs', data);
                },
                selectRootItem: function(state, data){
                    state.commit('selectRootItem', data);
                }
            }
        }
    };

    var _cahce = {};

    var _app = app.getApp(), router = _app.createContext().router;

    var layout = {
        name: 'layoutdefault',
        computed: {
            childs: function(){
                return this.$store.state.router.childs;
            },
            roots: function(){
                return this.$store.state.router.roots;
            }
        },
        beforeMount:function(){
            debugger;
            this.$store.registerModule('router', store.route);
        },
        methods:{
            goto: function(item, event){ 
                var _event = event, self = this;
                var chooseItem = function(item){
                    router.push(item.href);
                    self.$store.dispatch('selectRootItem', item);
                }

                self.$store.dispatch('childs',[]);

                if(item.thridpart && !_cahce[item.id]){
                    _app.acquire(item.path).done(function(arg){
                        arg[0].install(_app.createContext());
                        _cahce[item.id] = true;
                        chooseItem(item);
                    });
                }else{
                    chooseItem(item);
                }
            }
        }
    }
    return layout
});