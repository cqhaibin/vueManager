<template>
    <div style="height: auto;" >
    <Tabs value="work">
        <Tab-pane label="工作" name="work">
            <CountDown v-bind:workDuration="setting.workDuration" v-bind:restDuration="setting.restDuration" ></CountDown>
        </Tab-pane>
        <Tab-pane label="记录" name="history">
            <History></History>
        </Tab-pane>
        <Tab-pane label="设置" name="setting">
            <Setting></Setting>
        </Tab-pane>
    </Tabs>
    </div>
</template>
<script>

    import CountDown from './countDown.vue';
    import History from './history.vue';
    import Setting from './setting.vue';

    export default {
        name: 'tomato',
        components: {
            CountDown,
            History,
            Setting
        },
        computed:{
            setting:function(){
                let setting = this.$service.tomato.getSetting();
                return setting;
            }
        }
    }
</script>