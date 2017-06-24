define(['app'], function (app) { 'use strict';

app = 'default' in app ? app['default'] : app;

var store = {
    route: {
        state: {
            childs: [],
            roots: [{ id: 'ctitle', name: '标题', href: '/ctitle', selected: false }, { id: 'croute', name: '二级菜单', href: '/croute', selected: false }]
        },
        mutations: {
            /**
             * 添加二级导航，供于业务组件的使用
             */
            childs: function childs(state, data) {
                state.childs = data;
            },
            root: function root(state, data) {
                state.roots.push(data);
            },
            selectRootItem: function selectRootItem(state, data) {
                var len = state.roots.length;
                for (var irow = 0; irow < len; ++irow) {
                    if (state.roots[irow].id === data.id) {
                        state.roots[irow].selected = true;
                    } else {
                        state.roots[irow].selected = false;
                    }
                }
            }
        },
        actions: {
            childs: function childs(state, data) {
                state.commit('childs', data);
            },
            root: function root(state, data) {
                state.commit('root', data);
            },
            selectRootItem: function selectRootItem(state, data) {
                state.commit('selectRootItem', data);
            }
        }
    }
};

var _app = app.getApp();
var router = _app.createContext().router;

var defaultlayout = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "layout-default" }, [_c('div', { staticClass: "header" }, [_c('ul', { staticClass: "nav clearfix" }, _vm._l(_vm.roots, function (item, index) {
            return _c('li', { staticClass: "nav-item" }, [_c('a', { class: { active: item.selected }, attrs: { "href": "javascript:void(0)" }, on: { "click": function click($event) {
                        _vm.goto(item, $event);
                    } } }, [_vm._v(_vm._s(item.name))])]);
        }))]), _c('div', { staticClass: "body" }, [_c('div', { staticClass: "main" }, [_c('div', { staticClass: "cont" }, [_c('router-view')], 1)]), _c('div', { staticClass: "left" }, [_c('ul', { staticClass: "nav nav-child" }, _vm._l(_vm.childs, function (item, index) {
            return _c('li', { staticClass: "nav-item" }, [_c('router-link', { attrs: { "to": item.href, "active-class": "active" } }, [_vm._v(_vm._s(item.name))])], 1);
        }))])])]);
    }, staticRenderFns: [],
    name: 'layoutdefault',
    computed: {
        childs: function childs() {
            return this.$store.state.router.childs;
        },
        roots: function roots() {
            return this.$store.state.router.roots;
        }
    },
    beforeMount: function beforeMount() {
        this.$store.registerModule('router', store.route);
    },
    methods: {
        goto: function goto(item, event) {
            var _event = event,
                self = this;
            var chooseItem = function chooseItem(item) {
                router.push(item.href);
                self.$store.dispatch('selectRootItem', item);
            };

            self.$store.dispatch('childs', []);
            _app.loadThridPart(item, chooseItem);
        }
    }
};

var index = {
    defaultlayout: defaultlayout
};

return index;

});
