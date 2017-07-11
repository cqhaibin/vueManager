<template>
    <div style="height: auto;" >
    <Tabs value="tomato">
        <Tab-pane label="工作">
            <CountDown></CountDown>
        </Tab-pane>
        <Tab-pane label="记录">
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
        data: function(){
            return {

            }
        }
    }
</script>