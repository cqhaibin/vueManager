<template>
    <ul>
        <li><Input type="text" v-model="workDuration" placeholder="工作时长" ></Input> </li>
        <li><Input type="text" v-model="restDuration" placeholder="休息时长" ></Input> </li>
        <li><Button type="button" v-on:click="save" >保存</Button> </li>
    </ul>
</template>
<script>
import {Setting} from './model';
export default {
  name: 'setting',
  data (){
      return {
          workDuration: 25,
          restDuration: 5
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
