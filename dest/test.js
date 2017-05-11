define(function () { 'use strict';

var main = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v(_vm._s(_vm.cb)),_c('i-input',{model:{value:(_vm.cb),callback:function ($$v) {_vm.cb=$$v;},expression:"cb"}})],1)},staticRenderFns: [],
    name: 'main',
    data: function(){
        return {
            cb: 'name'
        }
    }
};

var index = {
    install: function(cxt){
        cxt.Vue.component('mainc', main);
    }
};

return index;

});
