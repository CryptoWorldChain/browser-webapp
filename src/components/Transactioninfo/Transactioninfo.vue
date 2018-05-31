<template>
    <div class="node-list">
        <!-- sdsafiiiidasda -->
        <!-- <Table class="table-list" @on-row-click="rowClick" :columns="columns1" :data="data1"></Table> -->
        <div class="nav-block">
          <div class="nav-block-inner wrapper clear">
            <div class="float-left">
              TxHash:  {{$route.query.txhash}}
            </div>
            <div class="float-right">
              <router-link :to="{path:'/'}">home</router-link> / <router-link :to="{path:'/transaction',query:{height:$route.query.height}}">Transaction</router-link> / Transactioninfo
            </div>
          </div>
        </div>
        <div class="block-info">
            <div class="block-title">
                Transaction Information
            </div>
            <div class="infomation">
                <div v-for="(item,index) in height_title" :key="index">
                    <div v-show="item.key=='froms'">
                        <div style="vertical-align: top; display:inline-block; width:200px;">
                            {{item.name}} :
                        </div>
                        <Table class="table-list inside-table" :columns="column_from" :data="data_from"></Table>
                       
                    </div>
                    <div   v-show="item.key=='tos'">
                        <div style="vertical-align: top; display:inline-block; width:200px;">
                            {{item.name}} :
                        </div>
                        <Table class="table-list inside-table" style="margin-bottom:10px;" :columns="column_to" :data="data_to"></Table>
                       
                    </div>
                    <!-- <div   v-show="item.key=='data'">
                        <div style="vertical-align: top; display:inline-block; width:200px;">
                            {{item.name}} :
                        </div>
                        <Input type="textarea" class="inputs-data" style="width:954px;" disabled :value=" blockinfo[item.key]?blockinfo[item.key]:' ' "/>
                    </div> -->
                    <div v-show="item.key!='froms' && item.key!='data' && item.key!='tos'">
                        <span class="sp1">{{ item.name}} :</span>
                        <span :class="item.key=='blockHeight'?'span-click':''" 
                            @click="item.key=='blockHeight'?onClicks(blockinfo,item.key):''"
                        >
                            <span v-show="item.key =='timeStamp'" >{{ timeago().format(blockinfo.timeStamp) }}</span>
                            <span v-show="item.key !='timeStamp'" >{{blockinfo[item.key]}}</span>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Table,Input} from "iview";
import {Message} from "../message/message.js";
    export default {
        components:{
            Table,Input
        },
        data() {
            return {
                columns1: [
                    {
                        title: '节点名称',
                        key: 'name',
                        // className:"iiii"
                    },
                    {
                        title: 'hash',
                        key: 'hash'
                    },
                    {
                        title: 'height',
                        key: 'height'
                    },
                    {
                        title: 'time',
                        key: 'time'
                    }
                ],
                data1: [
                    {
                        name: 'BEST BLOCK',
                        hash: 18,
                        height: 'New York No. 1 Lake Park',
                        time: '2016-10-03'
                    },
                    {
                        name: 'BEST BLOCK',
                        hash: 18,
                        height: 'New York No. 1 Lake Park',
                        time: '2016-10-03'
                    },
                    {
                        name: 'BEST BLOCK',
                        hash: 18,
                        height: 'New York No. 1 Lake Park',
                        time: '2016-10-03'
                    },
                    {
                        name: 'BEST BLOCK',
                        hash: 18,
                        height: 'New York No. 1 Lake Park',
                        time: '2016-10-03'
                    },
                    {
                        name: 'BEST BLOCK',
                        hash: 18,
                        height: 'New York No. 1 Lake Park',
                        time: '2016-10-03'
                    },
                    {
                        name: 'BEST BLOCK',
                        hash: 18,
                        height: 'New York No. 1 Lake Park',
                        time: '2016-10-03'
                    }
                ],
                height_title:[
                    {
                        name : "TxHash",
                        key: 'txHash',
                    },
                    {
                        name:"Block Height",
                        key: 'blockHeight',
                    },
                    {
                        name:"TimeStamp",
                        key: 'timeStamp',
                    },
                    {
                        name:"Status",
                        key:'status'
                    },
                    {
                        name:"From",
                        key: 'froms',
                    },
                    {
                        name:"To",
                        key: 'tos',
                    },
                    {
                        name:"Data",
                        key: 'data',
                    }
                ],
                blockinfo:{},
                column_to:[
                    {
                        title:"Address",
                        key:"address",
                        render:(h,params)=>{
                            return h('a',{
                                on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                            },params.row.address)
                        }
                    },
                    {
                        title:"Amount",
                        key:"amount",
                        className:"text-color"
                    },
                    {
                        title:"Symbol",
                        key:"symbol",
                        className:"text-color"
                    },
                    {
                        title:"cryptoToken",
                        key:"cryptoToken",
                        className:"text-color"
                    },
                ],
                data_to:[],
                column_from:[
                    {
                        title:"Address",
                        key:"address",
                        render:(h,params)=>{
                            return h('a',{
                                on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                            },params.row.address)
                        }
                    },
                    {
                        title:"Amount",
                        key:"amount",
                        className:"text-color"
                    },
                    {
                        title:"Fee",
                        key:"fee",
                        className:"text-color"
                    },
                    {
                        title:"FeeLimit",
                        key:"feeLimit",
                        className:"text-color"
                    },
                    {
                        title:"Token",
                        key:"token",
                        className:"text-color"
                    },
                    {
                        title:"Symbol",
                        key:"symbol",
                        className:"text-color"
                    },
                    {
                        title:"cryptoToken",
                        key:"cryptoToken",
                        className:"text-color"
                    },
                ],
                data_from:[]
            }
        },
        mounted(){
            this.routeinfo();
        },
        watch:{
            "$route":"routeinfo"
        },
        methods:{
           
            routeinfo(){
                this.spinner.start();
                let that = this;
                axios({
                    method:"post",
                    url:"/block/trs/pbgtt.do",
                    data:{
                        txHash:this.$route.query.txhash
                    }
                }).then((res)=>{
                    this.spinner.stop();
                    if(res.status=="200" && res.data && res.data.transaction){
                        that.blockinfo = res.data.transaction;
                        // alert(that.blockinfo.status);
                        if (that.blockinfo.status == 'null') {
                            that.blockinfo.status = 'pending';
                        }
                        that.data_to = res.data.transaction.tos;
                        that.data_from = res.data.transaction.froms;
                    }else{
                        Message.error("区块详情查询失败",3)
                    }
                }).catch((err) => {
                    this.spinner.stop();
                    Message.error("区块详情查询失败",3)
                })
            },
            onClicks(val,key){
                console.log(val+"---",key)
                if(key == "blockHeight"){
                  this.$router.push({path: '/block',query:{
                    block:val.blockHeight
                  }});
                }
               
            },
            show(val){
                this.$router.push("/address/"+val.row.address);
            }
        }
    }
</script>
<style lang="less">
.node-list{
    min-width: 1360px;
    // background: #002134;
    color:#969ca1;
    .block-info{
        width:1200px;
        min-width:1200px;
        min-height:300px;
        margin: 0 auto;
        border:1px solid #3b4b54;
        .block-title{
            background: #002134;
            line-height: 40px;
            border-bottom:1px solid #3b4b54;
            padding-left:20px;
        }
        .infomation{
            padding:20px 20px;
            .inputs-data{
                .ivu-input{
                    background: #002134;
                    border-color:#3b4b54;
                }
            }
            &>div{
                line-height: 40px;
                .sp1{
                    display: inline-block;
                    width:200px;
                }
                .span-click{
                    color:#9eeff3;
                    
                }
                .span-click:hover{
                    cursor:pointer;
                    // text-decoration: underline;
                    border-bottom:1px solid #9eeff3;
                }
                .button_span{
                  display: inline-block;
                  width:50px;
                  height:20px;
                  line-height: 20px;
                  text-align: center;
                  background: #002134;
                  color: #9eeff3;
                }
                .button_span:hover{
                  cursor:pointer;
                }
                span{
                    display:inline-block;
                    vertical-align: middle;
                }
                .from_list{
                    max-height:200px;
                    overflow:auto;
                    span{
                        margin-right: 20px;
                    }
                }
                .froms{
                    width: 200px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    color:#9eeff3;
                    margin-bottom: 1px;
                }
                .froms:hover{
                    border-bottom:1px solid #9eeff3;
                    cursor:pointer;
                }
            }
        }
    }
}
</style>
