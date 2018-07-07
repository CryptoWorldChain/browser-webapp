<template>
    <div>
        <Table class="table-list" :columns="columns1" :data="datas"></Table>
        <!-- <div class="pager">
            <div class="pager-inner">
                <Page :total="2300" />
            </div>
        </div> -->
    </div>
</template>
<script>
import {Table,Page} from "iview";
    export default {
        components:{
            Table,Page
        },
        props:{
            "params":Array
        },
        data(){
            return{
                columns1: [
                    {
                        title: 'TxHash',
                        key: 'txHash',
                        className: 'link ellipsis',
                        render: (h, params) => {
                            return h('a',{
                                on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                            },params.row.txHash)
                        }
                    },
                    {
                        title: 'Block',
                        key: 'blockHeight',
                        className: 'link',
                        render: (h, params) => {
                            return h('a',{
                                on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                            },params.row.blockHeight)
                        }
                    },
                    {
                        title: 'Age',
                        key: 'timestamp',
                        className:"text-color",
                        render: (h, params) => {
                            return h('span',this.timeago().format(params.row.timestamp))
                        }
                    },
                    {
                        title: 'From',
                        key: 'froms',
                        className:"text-color",
                    },
                    {
                        title: ' ',
                        key: 'From2',
                        width:100,
                        className:"from-to"
                    },
                    {
                        title: 'To',
                        key: 'tos',
                        className:"text-color"
                    },
                    {
                        title:'Status',
                        key:'status',
                        className:'text-color',
                        render: (h,params)=>{
                            var status = params.row.status;
                            if (status == 'null') {
                                status = 'pending';
                            }
                            console.log(status);
                            return h('a',status)
                        }
                    }
                ],
                datas:[],
                obj:[]
            }
        },
        watch:{
            params: "paramsinfo",
        },
        mounted(){
            this.paramsinfo();
        },
        methods:{
            paramsinfo(){
                console.log(this.params)
                if(this.params.length){
                    this.obj=this.params;
                    let that=this;
                    this.params.map((item)=>{
                        let from=[],to=[];
                        if (item.froms && item.froms.length) {
                            item.froms.map((item)=>{
                                from.push(item.address);
                            })
                        }
                        if (item.tos && item.tos.length) {
                            item.tos.map((item)=>{
                                to.push(item.address);
                            })
                        }
                        that.datas.push({
                            "txHash":item.txHash,
                            "blockHeight":item.blockHeight,
                            "timestamp":item.timeStamp,
                            "froms":from.join(),
                            "tos":to.join(),
                            "status":item.status
                        })
                    })
                }

                
            },
            show(val){
                // console.log(val)
                if(val.column.key == "txHash"){
                    this.$router.push({path:"/transactioninfo",query:{
                        height:val.row.blockHeight,
                        txhash:val.row.txHash
                    }})
                }
                if(val.column.key == "blockHeight"){
                    this.$router.push({path:"/block",query:{
                        block: val.row.blockHeight
                    }})
                }
            }
        }
    };
</script>
<style lang="less">
    
    .ivu-table-body .text-color .ivu-table-cell{
        color:#969ca1 !important;
    }
    .ivu-table-body .from-to .ivu-table-cell{
        display: block;
        width:100%;
        height:100%;
        background: url("/static/img/jiantou.png") no-repeat ;
        background-position: 50% 50%;
    }
    
</style>