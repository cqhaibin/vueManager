define(['bootstrap'],function(){

    var store = {
        route: { 
            state: {
                childs: [],
                roots: []
            },
            mutations: {
                childs: function(state, data){
                    state.childs = data;
                }
            },
            actions: {
                childs: function(state, data){
                    state.commit('childs', data);
                }
            }
        }
    };

    var layout = {
        name: 'layoutdefault',
        computed: {
            childs: function(){
                if(!this.$store.state.router) return null;
                return this.$store.state.router.childs;
            }
        },
        beforeMount:function(){
            this.$store.registerModule('router', store.route);
        }
    }
    return layout
});