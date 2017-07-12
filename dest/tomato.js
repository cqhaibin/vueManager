define(function () { 'use strict';

var CountDown = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "tomato-block" }, [_c('div', { staticClass: "circle" }, [_c('i-circle', { attrs: { "percent": _vm.percent, "size": 360 } }, [_c('span', { staticClass: "circle-time" }, [_vm._v(_vm._s(_vm.timeStr))])])], 1), _c('div', { staticClass: "btn-group" }, [_c('Button', { attrs: { "type": "success" }, on: { "click": _vm.startWork } }, [_vm._v("开始工作")]), _c('Button', { attrs: { "type": "warning" }, on: { "click": _vm.stop } }, [_vm._v("停止")]), _c('Button', { attrs: { "type": "info" }, on: { "click": _vm.startRest } }, [_vm._v("休息")])], 1)]);
    }, staticRenderFns: [],
    name: 'countDown',
    data: function data() {
        return {
            percent: 0,
            timeStr: '00:00',
            timeIndex: null
        };
    },

    props: {
        workDuration: {
            type: Number,
            default: 25
        },
        restDuration: {
            type: Number,
            default: 5
        }
    },
    methods: {
        startWork: function startWork() {
            // 750 / 1500 * 100
            //this.percent += 10;
            this.percent = 100;
            this.timeStr = this.workDuration + ":00";
            var workTime = this.workDuration * 60;
            this.durationPro(workTime);
        },
        startRest: function startRest() {
            this.percent = 100;
            this.timeStr = "0" + this.restDuration + ":00";
            var restTime = this.restDuration * 60;
            this.durationPro(restTime);
        },
        stop: function stop() {
            window.clearInterval(this.timeIndex);
            this.timeIndex = null;
        },
        durationPro: function durationPro(time) {
            var _this = this;

            var increase = 0,
                step = 2;
            if (this.timeIndex) {
                window.clearInterval(this.timeIndex);
            }
            this.timeIndex = window.setInterval(function () {
                increase++;
                if (increase > time) {
                    //时间到点
                    _this.percent = 0;
                    window.clearTimeout(_this.timeIndex);
                    return;
                }
                _this.timeStr = _this.secondToTime(time - increase);
                if (!(increase % step)) {
                    //不应该算百分比
                    return;
                }
                var tmp = increase / time * 100;
                _this.percent = 100 - tmp;
            }, 1000);
        },
        secondToTime: function secondToTime(time) {
            var hour = Math.floor(time / 3600),
                minute = Math.floor(time / 60) % 60,
                second = time % 60;
            return (minute >= 10 ? minute : '0' + minute) + ":" + (second >= 10 ? second : '0' + second);
        }
    }
};

var History = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._v("distory")]);
    }, staticRenderFns: [],
    name: 'history'
};

var tomato = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticStyle: { "height": "auto" } }, [_c('Tabs', { attrs: { "value": "work" } }, [_c('Tab-pane', { attrs: { "label": "工作", "name": "work" } }, [_c('CountDown')], 1), _c('Tab-pane', { attrs: { "label": "记录", "name": "history" } }, [_c('History')], 1)], 1)], 1);
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
