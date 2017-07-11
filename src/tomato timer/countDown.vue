<template>
    <div style="margin: 0 auto; width: 400px;" >
        <div class="circle">
            <i-circle v-model:percent="percent" size=360 ></i-circle>
        </div>
        <div class="buttons">
            <Button type="success">开始工作</Button>
            <Button type="warning">停止</Button>
            <Button type="info">休息</Button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'countDown',
        data: function(){
            return {
                percent: 10
            };
        }
    }
</script>