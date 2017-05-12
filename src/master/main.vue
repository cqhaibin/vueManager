<template>
<div>
    <i-input v-model="cb" ></i-input> 
</div>
</template>

<script>
    export default {
        name: 'mainc',
        data: function(){
            return {
                cb: '测试'
            }
        },
        beforeMount:function(){
            this.cb = "测试001";
        }
    }
</script>
