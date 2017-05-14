define(function () { 'use strict';

var main = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('i-input', { model: { value: _vm.cb, callback: function callback($$v) {
                    _vm.cb = $$v;
                }, expression: "cb" } })], 1);
    }, staticRenderFns: [],
    name: 'mainc',
    data: function data() {
        return {
            cb: '测试'
        };
    },
    beforeMount: function beforeMount() {
        this.cb = "测试001";
    }
};

var index = {
    install: function install(cxt) {
        cxt.Vue.component('mainc', main);
        cxt.router.addRoutes([{
            path: '/mainc',
            component: main
        }]);
    }
};

return index;

});
