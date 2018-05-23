<template>
    <div class="node-list">
        <!-- sdsafiiiidasda -->
        <!-- <Table class="table-list" @on-row-click="rowClick" :columns="columns1" :data="data1"></Table> -->
        <div class="nav-block">
          <div class="nav-block-inner wrapper clear">
            <div class="float-left">
              Block:  {{blockinfo.height}}
            </div>
            <div class="float-right">
              <router-link :to="{path:'/'}">home</router-link> / Block
            </div>
          </div>
        </div>
        <div class="block-info">
            <div class="block-title">
                Block Information
                <div class="float-right">
                    <router-link  style="padding-right: 20px;" :to="{path:'/'}">Back To Home</router-link>
                </div>
            </div>
            <div class="infomation">
                <p v-for="(item,index) in height_title" :key="index">
                    <span class="sp1">{{ item.name}} :</span>
                    <span :class="item.key=='parentHash'|| item.key=='txCount'?'span-click':''" 
                        @click="item.key=='parentHash'|| item.key=='txCount'?onClicks(blockinfo,item.key):''"
                    >
                        <span v-show="item.key =='height' && blockinfo[item.key] >1 " @click="Another(blockinfo[item.key]-1)" style="margin-right:20px;" class="button_span"> Prev </span>
                        <span v-show="item.key =='timestamp'" >{{ timeago().format(blockinfo[item.key]) }}</span>
                        <span v-show="item.key !='timestamp'" >{{blockinfo[item.key]}}</span>
                        <span style="margin-left:20px;" @click="Another(blockinfo[item.key]+1)" v-show="item.key =='height'" class="button_span"> Next </span>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {Table} from "iview";
import {Message} from "../message/message.js";
import bus from '../bus/bus';
    export default {
        components:{
            Table
        },
        data() {
            return {
                
                height_title:[
                    {
                        name : "Height",
                        key: 'height',
                    },
                    {
                        name:"TimeStamp",
                        key: 'timestamp',
                    },
                    {
                        name:"Transactions",
                        key: 'txCount',
                    },
                    {
                        name:"BlockHash",
                        key: 'blockHash',
                    },
                    {
                        name:"ParentHash",
                        key: 'parentHash',
                    },
                    {
                        name:"Coinbase",
                        key: 'coinbase',
                    }
                ],
                blockinfo:{
                },
                txcountinfo:[],
                lastBlock:{}
            }
        },
        created () {
            var that = this;
            bus.$on('getLastBlock',function (block) {
                if (block.height) {
                    that.lastBlock = block;
                }
            })
        },
        mounted(){
            this.mount_data();
        },
        watch:{
            "$route":"route"
        },
        methods:{
            route(){
                this.mount_data();
            },
            initLatest () {
                axios({
                    method:'post',
                    url:'/block/blk/pbgtb.do'
                }).then((res) => {
                    if (res.status == 200 && res.data.retCode == 1) {
                        this.lastBlock = res.data.block.header;
                    } 
                }).catch((err) => {
                    console.warn('err',err);
                    // this.block = {};
                })
            },
            mount_data(){
                // this.initLatest();
                let that=this;
                if (this.$route.query.block > this.lastBlock.height) {
                    this.message.warning('已经是最新区块。');
                    return false;
                }
                this.spinner.start();
                if(this.$route.query.block){
                    axios({
                        method:"post",
                        url:"/block/blk/pbghe.do",
                        data:{
                            blockHeight:this.$route.query.block
                        }
                    }).then((res)=>{
                        this.spinner.stop();
                        if(res.status=="200" && res.data && res.data.block && res.data.block.header){
                            if(res.data.block.header){
                                that.blockinfo = res.data.block.header;
                                that.blockinfo.txCount = that.blockinfo.txCount + ' transactions';
                            }else{
                                Message.error("暂无区块信息",3)
                            }
                            // if(res.data.block.body && res.data.block.body.transactions){
                            //     that.txcountinfo=res.data.block.body.transactions;
                            // }
                            
                        }else {
                            that.message.error('没有获取到区块详情');
                        }
                    }).catch((err) => {
                        this.spinner.stop();
                        that.message.error('没有获取到区块详情');
                    })
                }else if(this.$route.query.blockHash){
                    axios({
                        method:"post",
                        url:"/block/blk/pbgha.do",
                        data:{
                            blockHash:this.$route.query.blockHash
                        }
                    }).then((res)=>{
                        this.spinner.stop();
                        console.log(res)
                        if(res.status=="200" && res.data && res.data.block){
                            if(res.data.block.header){
                                that.blockinfo = res.data.block.header;
                                that.blockinfo.txCount = that.blockinfo.txCount + ' transactions';
                            }
                            if(res.data.block.body && res.data.block.body.transactions){
                                that.txcountinfo=res.data.block.body.transactions;
                            }
                        }
                    }).catch((err)=>{
                        this.spinner.stop();
                    })
                }else {
                    this.spinner.stop();
                }
                
            },
            onClicks(val,key){
                console.log(val+"---",key)
                if(key == "txCount"){
                    this.$router.push({
                            path: '/transaction',
                            name:"Transaction",
                            query:{
                                height:val.height,
                                // obj:JSON.stringify(this.txcountinfo)
                            }
                    });
                }
                if(key == "parentHash"){
                    this.$router.push({path: '/block',query:{
                        blockHash:val.parentHash
                    }});
                }
                // if(key == "minedBy"){
                //   // this.mount_data();
                //   console.log(val.minedBy)
                //   this.$router.push("/address/"+val.minedBy)
                // }
            },
            Another(val){
                // console.log(val);
                if (val > this.lastBlock.height) {
                    this.message.warning('已经是最新区块。');
                    return false;
                }
                this.$router.push({path: '/block',query:{
                    block:val
                }});
            }
        }
    }
</script>
<style lang="less">
.node-list{
    // padding-top:30px;
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
            padding-left:20px;
            p{
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
            }
        }
    }
}
</style>
