define([],function(){
    var compA = {
        name: 'compa',
        template: '<div>compa</div>'
    };
    var compB = {
        name: 'compb',
        template: '<div>compb</div>'
    };

    return {
        installed: false,
        install: function(cxt){ //应该是激活时执行的勾子，因为每次加载都应该执行           
            cxt.$vue.$store.dispatch('childs', [{ href: '/cb/compa', name: '第一个组件'},{ href: '/cb/compb', name: '第二个' }]);
            if(this.installed){
                return
            }
            this.installed = true;
            cxt.Vue.component('compa', compA);
            cxt.Vue.component('compb', compB);
            cxt.router.addRoutes([
                {
                    path: '/cb/compa',
                    component: compA
                },{
                    path: '/cb/compb',
                    component: compB
                }
            ]);
        }
    }
});