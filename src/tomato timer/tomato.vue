<template>
    <div style="height: auto;" >
    <Tabs value="work">
        <Tab-pane label="工作" name="work">
            <CountDown></CountDown>
        </Tab-pane>
        <Tab-pane label="记录" name="history">
            <History></History>
        </Tab-pane>
    </Tabs>
    </div>
</template>
<script>

    import CountDown from './countDown.vue';
    import History from './history.vue';

    export default {
        name: 'tomato',
        components: {
            CountDown,
            History
        },
        computed:{
            setting:function(){
                let setting = this.$service.tomato.getSetting();
            }
        }
    }
</script>