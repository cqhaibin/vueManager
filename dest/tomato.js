var tomato = (function () {
'use strict';

var keys = {addRecord:"ADDRECORD",removeAllRecord:"REMOVEALLRECORD",saveSetting:"SAVESETTING"/**
 * 事件状态：1：工作，2：休息
 */};var TYPE={work:1,rest:2};

var dom = {setTitle:function setTitle(title){document.title=title;},alert:function(_alert){function alert(_x){return _alert.apply(this,arguments);}alert.toString=function(){return _alert.toString();};return alert;}(function(text){alert(text);})};

var type=["","努力工作","轻松时刻"];var state={complete:"完成",run:"未完成"/**
 * 默认配置信息
 */};var optionsDefault={workDuration:25,restDuration:5/**
提示信息
 */};var popInfo={complete:"恭喜您，完成一个任务",runtime:"剩余："};

var CountDown = {render:function render(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tomato-block"},[_c('h1',{staticClass:"title"},[_vm._v("蕃茄钟--工作法")]),_c('div',{staticClass:"circle"},[_c('i-circle',{attrs:{"percent":_vm.percent,"size":360}},[_c('span',{staticClass:"circle-time"},[_vm._v(_vm._s(_vm.timeStr))])]),_c('Input',{attrs:{"type":"textarea","placeholder":"请输入您要完成的任务..."},model:{value:_vm.content,callback:function callback($$v){_vm.content=$$v;},expression:"content"}})],1),_c('div',{staticClass:"btn-group"},[_c('Button',{attrs:{"type":"success"},on:{"click":_vm.startWork}},[_vm._v("开始工作")]),_c('Button',{attrs:{"type":"warning"},on:{"click":_vm.stop}},[_vm._v("停止")]),_c('Button',{attrs:{"type":"info"},on:{"click":_vm.startRest}},[_vm._v("休息")])],1)]);},staticRenderFns:[],name:'countDown',data:function data(){return{percent:0,timeStr:'00:00',timeIndex:null,currentRecord:null,content:null};},props:{workDuration:{type:Number,default:25},restDuration:{type:Number,default:5}},methods:{startWork:function startWork(){// 750 / 1500 * 100
//this.percent += 10;
this.percent=100;this.timeStr=this.workDuration+":00";var workTime=this.workDuration*60;this.durationPro(workTime);this.$service.tomato.start(TYPE.work,workTime,this.content);},startRest:function startRest(){this.percent=100;this.timeStr="0"+this.restDuration+":00";var restTime=this.restDuration*60;this.durationPro(restTime);this.$service.tomato.start(TYPE.rest,restTime,"休息时间");},stop:function stop(){this.$service.tomato.stop(false);window.clearInterval(this.timeIndex);this.timeIndex=null;},durationPro:function durationPro(time){var _this=this;var increase=0,step=2;if(this.timeIndex){window.clearInterval(this.timeIndex);}this.timeIndex=window.setInterval(function(){increase++;if(increase>time){//时间到点
_this.percent=0;_this.$service.tomato.stop(true);window.clearTimeout(_this.timeIndex);dom.setTitle(popInfo.complete);dom.alert(popInfo.complete);return;}_this.timeStr=_this.secondToTime(time-increase);dom.setTitle(popInfo.runtime+_this.timeStr);if(!(increase%step)){//不应该算百分比
return;}var tmp=increase/time*100;_this.percent=100-tmp;},1000);},secondToTime:function secondToTime(time){var hour=Math.floor(time/3600),minute=Math.floor(time/60)%60,second=time%60;return(minute>=10?minute:'0'+minute)+":"+(second>=10?second:'0'+second);}}};

var History = {render:function render(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tomato-history"},[_c('Button',{attrs:{"type":"warning"},on:{"click":_vm.clearAll}},[_vm._v("清空")]),_c('Table',{attrs:{"columns":_vm.column,"data":_vm.records,"no-data-text":"暂无数据","row-class-name":_vm.rowClassName}})],1);},staticRenderFns:[],name:'history',data:function data(){return{column:[{title:"说明",key:"content",render:function render(h,params){var str="["+new Date(params.row.begTime).toLocaleString()+"] - ["+new Date(params.row.endTime).toLocaleString()+"] 做 "+params.row.content;return h('div',str);}},{title:"状态",key:"state",render:function render(h,params){return h('div',{class:{'state-cell':true}},[h('span',type[params.row.type]),h('span',{class:{'run':true,'undone':!params.row.state}},params.row.state?state.success:state.run)]);}}]};},computed:{records:function records(){return this.$service.tomato.getRecords();}},methods:{rowClassName:function rowClassName(row,index){return row.state?'row-info':'row-err';},clearAll:function clearAll(){this.$service.tomato.clear();}}};

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Record=function Record(){_classCallCheck(this,Record);this.id=0,this.content=null;this.begTime=null;this.endTime=null;this.complete=false;//状态：完成，未完成等
this.type=null;//类型：休息、工作
this.stopTime=null;//停止时间
};/**
 * 设置配置模型
 */var Setting$1=function Setting(workTime,restTime){_classCallCheck(this,Setting);this.workDuration=workTime;this.restDuration=restTime;};

var Setting$$1 = {render:function render(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"tomato-setting-block"},[_c('li',[_c('Input',{attrs:{"type":"text","number":true,"placeholder":"工作时长"},model:{value:_vm.workDuration,callback:function callback($$v){_vm.workDuration=$$v;},expression:"workDuration"}})],1),_c('li',[_c('Input',{attrs:{"type":"text","number":true,"placeholder":"休息时长"},model:{value:_vm.restDuration,callback:function callback($$v){_vm.restDuration=$$v;},expression:"restDuration"}})],1),_c('li',[_c('Button',{attrs:{"type":"info"},on:{"click":_vm.save}},[_vm._v("保存")])],1)]);},staticRenderFns:[],name:'setting',data:function data(){return{workDuration:optionsDefault.workDuration,restDuration:optionsDefault.restDuration};},beforeMount:function beforeMount(){var setting=this.$service.tomato.getSetting();if(setting){this.workDuration=setting.workDuration;this.restDuration=setting.restDuration;}},methods:{save:function save(){var setting=new Setting$1(this.workDuration,this.restDuration);this.$service.tomato.saveSetting(setting);}}};

var tomato = {render:function render(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"auto"}},[_c('Tabs',{attrs:{"value":"work"}},[_c('Tab-pane',{attrs:{"label":"工作","name":"work"}},[_c('CountDown',{attrs:{"workDuration":_vm.setting.workDuration,"restDuration":_vm.setting.restDuration}})],1),_c('Tab-pane',{attrs:{"label":"记录","name":"history"}},[_c('History')],1),_c('Tab-pane',{attrs:{"label":"设置","name":"setting"}},[_c('Setting')],1)],1)],1);},staticRenderFns:[],name:'tomato',components:{CountDown:CountDown,History:History,Setting:Setting$$1},computed:{setting:function setting(){var setting=this.$service.tomato.getSetting();return setting;}}};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var _typeof$1=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/** Detect free variable `global` from Node.js. */var freeGlobal=(typeof commonjsGlobal==='undefined'?'undefined':_typeof$1(commonjsGlobal))=='object'&&commonjsGlobal&&commonjsGlobal.Object===Object&&commonjsGlobal;var _freeGlobal=freeGlobal;

var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/** Detect free variable `self`. */var freeSelf=(typeof self==='undefined'?'undefined':_typeof(self))=='object'&&self&&self.Object===Object&&self;/** Used as a reference to the global object. */var root=_freeGlobal||freeSelf||Function('return this')();var _root=root;

/** Built-in value references. */var _Symbol=_root.Symbol;var _Symbol_1=_Symbol;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */function arrayMap(array,iteratee){var index=-1,length=array==null?0:array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}return result;}var _arrayMap=arrayMap;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */var isArray=Array.isArray;var isArray_1=isArray;

/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var nativeObjectToString=objectProto.toString;/** Built-in value references. */var symToStringTag$1=_Symbol_1?_Symbol_1.toStringTag:undefined;/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag$1),tag=value[symToStringTag$1];try{value[symToStringTag$1]=undefined;var unmasked=true;}catch(e){}var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag$1]=tag;}else{delete value[symToStringTag$1];}}return result;}var _getRawTag=getRawTag;

/** Used for built-in method references. */var objectProto$1=Object.prototype;/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var nativeObjectToString$1=objectProto$1.toString;/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */function objectToString(value){return nativeObjectToString$1.call(value);}var _objectToString=objectToString;

/** `Object#toString` result references. */var nullTag='[object Null]';
var undefinedTag='[object Undefined]';/** Built-in value references. */var symToStringTag=_Symbol_1?_Symbol_1.toStringTag:undefined;/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag;}return symToStringTag&&symToStringTag in Object(value)?_getRawTag(value):_objectToString(value);}var _baseGetTag=baseGetTag;

var _typeof$3=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */function isObjectLike(value){return value!=null&&(typeof value==='undefined'?'undefined':_typeof$3(value))=='object';}var isObjectLike_1=isObjectLike;

var _typeof$2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/** `Object#toString` result references. */var symbolTag='[object Symbol]';/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */function isSymbol(value){return(typeof value==='undefined'?'undefined':_typeof$2(value))=='symbol'||isObjectLike_1(value)&&_baseGetTag(value)==symbolTag;}var isSymbol_1=isSymbol;

/** Used as references for various `Number` constants. */var INFINITY=1/0;/** Used to convert symbols to primitives and strings. */var symbolProto=_Symbol_1?_Symbol_1.prototype:undefined; var symbolToString=symbolProto?symbolProto.toString:undefined;/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */function baseToString(value){// Exit early for strings to avoid a performance hit in some environments.
if(typeof value=='string'){return value;}if(isArray_1(value)){// Recursively convert values (susceptible to call stack limits).
return _arrayMap(value,baseToString)+'';}if(isSymbol_1(value)){return symbolToString?symbolToString.call(value):'';}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;}var _baseToString=baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */function toString(value){return value==null?'':_baseToString(value);}var toString_1=toString;

/** Used to generate unique IDs. */var idCounter=0;/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */function uniqueId(prefix){var id=++idCounter;return toString_1(prefix)+id;}var uniqueId_1=uniqueId;

var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$1(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Service=function(){function Service(store,storage){_classCallCheck$1(this,Service);this.$store=store;this.storage=storage;this.storageKey="RECORDS";this.storageSettingKey="Setting";this.currentRecord=null;this._prefix="record_";this.$state=this.$store.state;this.loadData();}_createClass(Service,[{key:'addRecord',value:function addRecord(){this.$store.commit(keys.addRecord,this.currentRecord);this.storage.changeValue(this.storageKey,JSON.stringify(this.$state.tomato.records));}},{key:'saveSetting',value:function saveSetting(data){this.$store.commit(keys.saveSetting,data);this.storage.changeValue(this.storageSettingKey,JSON.stringify(this.$state.tomato.setting));}},{key:'getRecords',value:function getRecords(){return this.$state.tomato.records;}},{key:'getSetting',value:function getSetting(){var setting=this.$state.tomato.setting;if(!setting){setting=new Setting$1(optionsDefault.workDuration,optionsDefault.restDuration);}return setting;}},{key:'clear',value:function clear(){this.$store.commit(keys.removeAllRecord);this.storage.changeValue(this.storageKey,"");}},{key:'loadData',value:function loadData(){var _this=this;var str=this.storage.readValue(this.storageKey);if(str){var arrayData=JSON.parse(str);arrayData.forEach(function(data,index){_this.$store.commit(keys.addRecord,data);});}//setting
var str=this.storage.readValue(this.storageSettingKey);if(str){var obj=JSON.parse(str);this.$store.commit(keys.saveSetting,new Setting$1(obj.workDuration,obj.restDuration));}}/**
     * 开始做事情
     * @param type TYPE，事件状态
     * @param duration 时长，秒
     * @param content 内容
     */},{key:'start',value:function start(type$$1,duration,content){var record=new Record(),nowDate=new Date();record.id=uniqueId_1(this._prefix);record.begTime=nowDate;record.endTime=new Date(nowDate.getTime()+duration*1000);record.type=type$$1;record.content=content;this.currentRecord=record;}/**
     * 停止做事情 
     * @param isauto 是否自动停止
     */},{key:'stop',value:function stop(isauto){if(!this.currentRecord){return;}this.currentRecord.stopTime=new Date();this.currentRecord.state=isauto?true:false;this.addRecord();}}]);return Service;}();

var _mutations;function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var state$1={records:[],setting:{}};var mutations=(_mutations={},_defineProperty(_mutations,keys.addRecord,function(state,record){state.records.push(record);}),_defineProperty(_mutations,keys.removeAllRecord,function(state){state.records=[];}),_defineProperty(_mutations,keys.saveSetting,function(state,setting){state.setting=setting;}),_mutations);var store = {state:state$1,mutations:mutations};

var _createClass$1=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$2(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/**
 * 本地存储
 */var LocalStorage=function(){function LocalStorage(){_classCallCheck$2(this,LocalStorage);}_createClass$1(LocalStorage,[{key:"changeValue",value:function changeValue(name,val){window.localStorage.setItem(name,val);}},{key:"readValue",value:function readValue(name){return window.localStorage.getItem(name);}}]);return LocalStorage;}();

var index = {install:function install(cxt){cxt.Vue.component("tomatoTimer",tomato);cxt.router.addRoutes([{path:'/tomato',component:tomato}]);cxt.$vue.$store.registerModule("tomato",store);//先注册存储，再注册服务
cxt.service.registerService("tomato",new Service(cxt.$vue.$store,new LocalStorage()));}};

return index;

}());
//# sourceMappingURL=tomato.js.map
