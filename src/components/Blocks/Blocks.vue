<template>
    <div class="block-list">
        <div class="nav-block">
          <div class="nav-block-inner wrapper clear">
            <div class="float-left">
              Blocks
            </div>
            <div class="float-right">
              <router-link :to="{path:'/'}">home</router-link> / Blocks
            </div>
          </div>
        </div>
        <div class="wrapper">
            <Table class="table-list" :columns="columns1" :data="blocks"></Table>
            <div class="pager">
                <div class="pager-inner">
                    <Page :total="totalPage" @on-change="changePage"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Table, Page } from "iview";
    export default {
        components:{
            Table,Page
        },
        data() {
            return {
                totalPage:0,
                pageSize:10,
                pageNo:1,
                blocks:[],
                columns1: [
                    {
                        title: 'height',
                        key: 'height',
                        className:'link',
                        width: 150,
                        render: (h, params) => {
                            return h('a',{
                                on: {
                                        click: () => {
                                            this.toblock(params)
                                        }
                                    }
                            },params.row.height)
                        }
                    },
                    {
                        title:'Block Hash',
                        key:'blockHash',
                        className:'link',
                        width: 540,
                        render: (h,params) => {
                            return h('a',{
                                on:{
                                    "class":'link',
                                    click: () => {
                                        this.$router.push({
                                            path:'/block',
                                            query:{
                                                blockHash:params.row.blockHash
                                            }
                                        })
                                    }
                                }
                            },params.row.blockHash);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        className:'text-color',
                        render: (h, params) => {
                            return h('span',params.row.age)
                        }
                    },
                    {
                        title: 'txn',
                        key: 'txCount',
                        className:'link',
                        render: (h,params) => {
                            return h('a',{
                                on:{
                                    click: () => {
                                        this.totxn(params);
                                    }
                                }
                            },params.row.txCount)
                        }
                    },
                    // {
                    //     title: 'GasUsed',
                    //     key: 'gasUsed',
                    //     className:'text-color'
                    // },
                    // {
                    //     title: 'GasLimit',
                    //     key: 'gasLimit',
                    //     className:"text-color",
                    //     width:100,
                    //     // className:"from-to
                    // },
                    // {
                    //     title: 'Avg.GasPrice',
                    //     key: 'avgGasPrice',
                    //     className:"text-color",
                    //     render: (h, params) => {
                    //         console.log(params)
                    //         return h('span',params.row.avgGasPrice)
                    //     }
                    // },
                    {
                        title: 'Reward',
                        className:"text-color",
                        key: 'reward',
                        render:(h,params) => {
                            return h('span',parseFloat(params.row.reward));a
                        }
                    }
                ]
            }
        },
        mounted () {
            this.initBlocks();
        },
        methods:{
            totxn ({row}){
                this.$router.push({
                    path:'/transaction',
                    query:{
                        height:row.height
                    }
                })
            },
            toblock({row,index,column}){
                if (row && row.height) {
                    this.$router.push({
                        path:'/block/?block='+row.height
                    })
                }
            },
            initBlocks (pageSize,pageNo) {
                this.spinner.start();
                if (!pageSize) {
                    pageSize = 10;
                }
                if (!pageNo) {
                    pageNo = 1;
                }
                axios.post('/block/blk/pbgbb.do',{pageSize,pageNo}).then((res) => {
                    this.spinner.stop();
                    if (res.status == 200 && res.data.retCode == 1 && res.data.blocks && res.data.blocks.length) {
                        this.totalPage = res.data.totalCount;
                        this.blocks = res.data.blocks.map((item,index)=>{
                            var block = item.header;
                            var now = new Date().getTime();
                            var age = Math.floor((now - block.timestamp)/1000);
                            if (age <= 10) {
                                block.age = age + 's ago';
                            }else {
                                block.age = this.timeago().format(block.timestamp);
                            }
                            return block;
                        });
                    }else {
                        this.message.warning('Unable to locate block')
                    }
                }).catch((err) => {
                    this.spinner.stop();
                    console.log('errr',err);
                    this.message.error('connection failed, please try again later');
                })
            },
            changePage (pageNo) {
                var pageSize = this.pageSize;
                this.initBlocks(pageSize,pageNo);
            }
        }
    }
</script>
<style lang="less">
    .block-list{
        margin-top:30px;
        .link:hover {
            text-decoration: underline; 
        }
        .link a {
            display: block;
            padding: 6px 0;
        }
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
    }
</style>
