define(function () { 'use strict';

var CountDown = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticStyle: { "margin": "0 auto", "width": "400px" } }, [_c('div', { staticClass: "circle" }, [_c('i-circle', { attrs: { "size": "360" }, model: { value: _vm.percent, callback: function callback($$v) {
                    _vm.percent = $$v;
                }, expression: "percent" } })], 1), _c('div', { staticClass: "buttons" }, [_c('Button', { attrs: { "type": "success" } }, [_vm._v("开始工作")]), _c('Button', { attrs: { "type": "warning" } }, [_vm._v("停止")]), _c('Button', { attrs: { "type": "info" } }, [_vm._v("休息")])], 1)]);
    }, staticRenderFns: [],
    name: 'countDown',
    data: function data() {
        return {
            percent: 10
        };
    }
};

var History = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._v("distory")]);
    }, staticRenderFns: [],
    name: 'history'
};

var tomato = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticStyle: { "height": "auto" } }, [_c('Tabs', { attrs: { "value": "tomato" } }, [_c('Tab-pane', { attrs: { "label": "工作" } }, [_c('CountDown')], 1), _c('Tab-pane', { attrs: { "label": "记录" } }, [_c('History')], 1)], 1)], 1);
    }, staticRenderFns: [],
    name: 'tomato',
    components: {
        CountDown: CountDown,
        History: History
    },
    data: function data() {
        return {};
    }
};

var index = {
    install: function install(cxt) {
        cxt.Vue.component("tomatoTimer", tomato);
        cxt.router.addRoutes([{
            path: '/tomato',
            component: tomato
        }]);
    }
};

return index;

});
