<template>
    <div class="tomato-history" >
        <Button type="warning" v-on:click="clearAll" >清空</Button>
        <Table v-bind:columns="column" :data="records" no-data-text="暂无数据" :row-class-name="rowClassName" ></Table>
    </div>
</template>
<script>
    import { type, state } from './state';
    export default{
        name: 'history',
        data () {
            return {
                column:[
                    {
                        title: "说明",
                        key: "content",
                        render: (h, params) => {
                            let str = "[" + (new Date(params.row.begTime).toLocaleString() ) + "] - ["
                            + (new Date(params.row.endTime).toLocaleString() ) + "] 做 " + params.row.content;
                            return h('div', str);
                        }
                    },
                    {
                        title: "状态",
                        key: "state",
                        render: (h, params) => {
                            return h('div',{
                                class: { 'state-cell' : true }
                            },[h('span', type[params.row.type]),
                             h('span', { class: { 'run': true, 'undone': !params.row.state } } , params.row.state ? state.complete: state.run )]);
                        }
                    }
                ]
            }
        },
        computed:{
            records:function(){
                return this.$service.tomato.getRecords();
            }
        },
        methods:{
            rowClassName(row,index){
                return row.state ? 'row-info' : 'row-err';
            },
            clearAll:function(){
                this.$service.tomato.clear();
            }
        }
    }
</script>