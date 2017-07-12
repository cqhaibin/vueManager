<template>
    <div class="tomato-block" >
        <div class="circle">
            <i-circle v-bind:percent="percent" :size=360 ></i-circle>
        </div>
        <div class="btn-group">
            <Button type="success" v-on:click="start">开始工作</Button>
            <Button type="warning">停止</Button>
            <Button type="info">休息</Button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'countDown',
        data () {
            return {
                percent: 10
            };
        },
        props: {
            workDuration:{
                type: Number,
                default:25
            },
            restDuration:{
                type:Number,
                default:5
            }
        },
        methods:{
            start () {
                // 750 / 1500 * 100
                this.percent += 10;
            }
        }
    }
</script>