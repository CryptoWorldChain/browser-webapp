<template>
  <div>
    <div class="header-inner">
      <div class="header-top">
        <div class="container-fluid items">
          <div class="row">
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>BEST BLOCK</h4>
                <p  @click="toblock" class="latest-block-value link" style="cursor: pointer;">#{{latest_block}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">MINER</span>
                  <span @click="toAddress($event,block.miner && block.miner.address)" style="cursor: pointer;width: 120px;" class="float-right color-red ellipsis link">{{block.miner && block.miner.address}}</span>
                </div>
              </div>
            </div>
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>LAST BLOCK</h4>
                <p>{{last_block_time}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">NEXT BLOCK</span>
                  <span class="float-right color-red">{{next_block_time}} s</span>
                </div>
              </div>
            </div>
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>AVG BLOCK TIME</h4>
                <p>{{header.avgBlockTime ? header.avgBlockTime : '0'}} s</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">LAST BLOCK</span>
                  <span class="float-right color-red">{{last_block_time}}</span>
                </div>
              </div>
            </div>
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>TPS</h4>
                <p>{{header.tps}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">LAST TX</span>
                  <span class="float-right color-red">{{block.txCount}}</span>
                </div>
              </div>
            </div>
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>NODES</h4>
                <p @click="toNodeList" class="all-nodes link">{{header.nodes}}</p>
                <div class="clear">
                  <div class="float-left">
                    <span @click="toNodeList($event,'dpos')" class="color-yellow link">DPOS</span> <span class="color-red">{{header.dNodes}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div class="float-right">
                    <span @click="toNodeList($event,'pending')" class="color-yellow link">PENDING</span> <span class="color-red">{{header.pNodes}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>AVG TX TIME</h4>
                <p>{{header.confirm ? header.confirm + ' s' : '0' + ' s'}}</p>
              </div>
            </div>
            <!-- <div class="col-2 top-item">
              <div class="top-item-inner">
                <h4>DPOS</h4>
                <p>{{header.dpos}}</p>
                <div class="clear">
                  <span class="float-left color-yellow f12">PAGE LATENCY</span>
                  <span class="float-right color-red">112 ms</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../bus/bus';
import { refreshInterval } from '@/constant/constant'
export default {
  data () {
    return {
      height:'',
      block_time: '',
      tps:'0',
      nodes:0,
      dpos:0,
      block:{

      },
      header:{
        avgBlockTime:'',
        dpos:'',
        nodes:'',
        tps:''
      }
    }
  },
  created (){
    var that = this;
    bus.$on('getLastBlock',function (block) {
      if (block && block.height) {
        that.block = block;
      }
    })
  },
  mounted () {
    this.initLatest();
    this.interval();
    this.getHeaderInfo();
  },
  computed:{
    latest_block () {
      var height = this.block.height;
      return this.accounting.formatNumber(height);
    },
    last_block_time () {
      var time = this.block.timestamp;
      var last = new Date(time);
      var now = new Date().getTime();
      if (time) {
        var age = ((now - time)/1000);
        if (age < 0) {
          age = 0;
        }
        if (age < 10) {
          return age.toFixed(2) + 's ago';
        }
      }
      return this.timeago().format(last);
    },
    next_block_time () {
      var header = this.header;
      var last_block = this.block.timestamp;
      var now = new Date().getTime();
      var last_block_time = 0;
      if (last_block) {
        last_block_time = (now - last_block)/1000;
      }
      var time = parseFloat(header.avgBlockTime) - parseFloat(last_block_time);
      if (time <= 0 ) {
        time = 0;
      }
      return time ? Number(time).toFixed(2) : 0;
    },
    avg_block_time () {
      var time = this.block_time;
      return time + ' s';
    }
  },
  methods:{
    toblock () {
      var height = this.block.height;
      this.$router.push({
        path:'/block',
        query:{
          block:this.block.height
        },
        params:{
          height:'23'
        }
      })
    },
    toNodeList (e,value) {
      let status = '';
      status = value ? value : '';
      this.$router.push({
        path:'/nodelist',
        query: {
          status
        }
      })
    },
    initLatest () {
      axios({
        method:'post',
        url:'/block/blk/pbgtb.do'
      }).then((res) => {
        if (res.status == 200 && res.data.retCode == 1 && res.data.block) {
          this.block = res.data.block.header;
          // bus.$emit('getLastBlock',res.data.block.header);
        } 
      }).catch((err) => {
        console.warn('err',err);
      })
    },
    interval () {
      setInterval (() => {
        this.initLatest();
        this.getHeaderInfo();
      },refreshInterval);
    },
    getHeaderInfo () {
      // this.spinner.start();
      var that = this;
      axios.post('/block/adi/pbget.do').then((res) => {
        this.spinner.stop();
        // console.log('get header succeed',res);
        if (res.status == 200 && res.data && res.data.retCode == 1) {
          that.header = res.data;
        }
      }).catch((err) => {
        this.spinner.stop();
        // this.message.error('网络请求貌似出问题了，请稍后重试');
        console.log('get header failed',err);
      })
    },
    toAddress(e,address) {
      if (!address) {
        return
      }
      this.$router.push({
        name: 'Address',
        params:{
          address
        }
      })
    }
  }
}
</script>

<style lang="less">
  .header-top .items {
    height: 100px;
  }
  .top-item{
    position: relative;
    height: 100px;
    .top-item-inner {
      cursor: default;
      padding: 5px 14px;
      background: #213848;
      width: 96%;
      position: absolute;
      top: 0;
      left:0; 
      right: 0;
      bottom: 0;
      margin: auto;
      &.nodes {
        cursor: pointer;
      }
      h4 {
        font-size: 16px;
        line-height: 2em;
        color: #EB9938;
        font-weight: 600;
      }
      p {
        font-size: 24px;
        color: #AEECF0;
        margin-bottom: 10px;
        height: 28px;
        line-height: 28px;
      }
    }
  }
</style>
