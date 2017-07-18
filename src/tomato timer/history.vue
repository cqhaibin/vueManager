<template>
    <div>
        <Table v-bind:columns="column" :data="records" ></Table>
    </div>
</template>
<script>
    export default{
        name: 'history',
        data () {
            return {
                column:[
                    {
                        title: "说明",
                        key: "content",
                        render: (h, params) => {
                            console
                            return h('div', params.row.begTime);
                        }
                    },
                    {
                        title: "状态",
                        key: "state"
                    }
                ]
            }
        },
        computed:{
            records:function(){
                return this.$service.tomato.getRecords();
            }
        }
    }
</script>