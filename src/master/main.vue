<template>
    <div>{{cb}}
        <i-Input v-model="cb" ></i-Input >
    </div>
</template>
<script>
    export default{
        name: 'main',
        data: function(){
            return {
                cb: 'name'
            }
        }
    }
</script>