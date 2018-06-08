<template>
    <div class="block-list ">
        <div class="nav-block">
          <div class="nav-block-inner wrapper clear">
            <div class="float-left">
              Block:  {{$route.query.height}}
            </div>
            <div class="float-right">
              <router-link :to="{path:'/'}">home</router-link> / <router-link :to="{path:'/block',query:{block:$route.query.height}}">Block</router-link> / Transaction
            </div>
          </div>
        </div>
        <TableInfo :params="params" />
    </div>
</template>
<script>
import TableInfo from "./tableinfo.vue";
import {Message} from "../message/message.js";
    export default {
        components:{
            TableInfo
        },
        data() {
            return {
                params:[],
            }
        },
        mounted(){
            this.init();            
        },
        methods:{
            init () {
                this.spinner.start();
                let that = this;
                axios({
                    method:"post",
                    url:"/block/blk/pbghe.do",
                    data:{
                        blockHeight:this.$route.query.height
                    }
                }).then((res)=>{
                    this.spinner.stop();
                    console.log(res)
                    if(res.status=="200" && res.data && res.data.block){
                        if(res.data.block.body && res.data.block.body.transactions){
                            that.params=res.data.block.body.transactions;
                        }else{
                            // Message.error("区块暂无交易信息",3)
                        }
                    } else {
                        Message.warning('no transactions')
                    }
                }).catch((err) => {
                    this.spinner.stop();
                    Message.error("connection failed",3)
                })
            }
        }
        
    }
</script>
<style lang="less">
    .block-list{
        // margin-top:30px;
        min-width: 1360px;
        
    }
</style>
