define(function () { 'use strict';

var main = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v(_vm._s(_vm.cb)),_c('i-input',{directives:[{name:"model",rawName:"v-model",value:(_vm.cb),expression:"cb"}],domProps:{"value":(_vm.cb)},on:{"i-input":function($event){if($event.target.composing){ return; }_vm.cb=$event.target.value;}}})])},staticRenderFns: [],
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
