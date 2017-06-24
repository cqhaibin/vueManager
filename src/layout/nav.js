var store = {
    route: { 
        state: {
            childs: [],
            roots: [{id:'ctitle', name: '标题', href: '/ctitle', selected: false},
            {id:'croute', name: '二级菜单', href: '/croute', selected: false}]
        },
        mutations: {
            /**
             * 添加二级导航，供于业务组件的使用
             */
            childs: function(state, data){ 
                state.childs = data;
            },
            root: function(state, data){
                state.roots.push(data);
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
            root: function(state, data){
                state.commit('root', data);
            },
            selectRootItem: function(state, data){
                state.commit('selectRootItem', data);
            }
        }
    }
};

export default store;