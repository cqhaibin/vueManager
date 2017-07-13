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
            this.$service.tomato.addRecord();
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

var keys = {
    addRecord: "ADDRECORD",
    removeAllRecord: "REMOVEALLRECORD",
    saveSetting: "SAVESETTING"
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var Service = function () {
    function Service(cxt) {
        classCallCheck(this, Service);

        this.cxt = cxt;
        this.$store = this.cxt.$vue.$store;
    }

    createClass(Service, [{
        key: "addRecord",
        value: function addRecord() {
            this.$store.commit(keys.addRecord, { id: "id" });
        }
    }]);
    return Service;
}();

var _mutations;

var state = {
    records: [],
    setting: {}
};

var mutations = (_mutations = {}, defineProperty(_mutations, keys.addRecord, function (state, record) {
    state.records.push(record);
}), defineProperty(_mutations, keys.removeAllRecord, function (state) {
    state.records = [];
}), defineProperty(_mutations, keys.saveSetting, function (state, setting) {
    state.setting = setting;
}), _mutations);

var store = {
    state: state,
    mutations: mutations
};

var index = {
    install: function install(cxt) {
        cxt.Vue.component("tomatoTimer", tomato);
        cxt.router.addRoutes([{
            path: '/tomato',
            component: tomato
        }]);
        cxt.service.registerService("tomato", new Service(cxt));
        debugger;
        cxt.$vue.$store.registerModule("tomato", store);
    }
};

return index;

});
