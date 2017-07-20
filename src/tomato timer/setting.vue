<template>
    <ul class="tomato-setting-block" >
        <li><Input type="text" v-model="workDuration" :number=true placeholder="工作时长" ></Input> </li>
        <li><Input type="text" v-model="restDuration" :number=true placeholder="休息时长" ></Input> </li>
        <li><Button type="info" v-on:click="save" >保存</Button> </li>
    </ul>
</template>
<script>
import {Setting} from './model';
import{optionsDefault} from './state';
export default {
  name: 'setting',
  data (){
      return {
          workDuration: optionsDefault.workDuration,
          restDuration: optionsDefault.restDuration
      }
  },
  beforeMount () {
      let setting = this.$service.tomato.getSetting();
      if(setting){
        this.workDuration = setting.workDuration;
        this.restDuration = setting.restDuration;    
      }
  },
  methods:{
      save:function(){
        var setting = new Setting(this.workDuration, this.restDuration);
        this.$service.tomato.saveSetting(setting);
      }
  }
}
</script>
