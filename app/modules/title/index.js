define([],function(){
    return {
        name: 'ctitle',
        data: function(){
            return {
                title: '这是一个标题'
            }
        },
        beforeMount:function(){
            debugger
            this.$store.dispatch('childs',[]);
        }
    };
});