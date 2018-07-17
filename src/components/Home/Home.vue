<template>
  <div>
    <div class="header-main">
      <div class="home-mask"></div>
      <div class="particles-wrapper">
        <canvas class="bg-particles"></canvas>
      </div>
      <div style="width: 1000px;margin:auto;position: relative;z-index:999">
        <div class="bg-earth">
          <canvas id="earth" width="410" height="410" style="width:410px;height:410px;" class="earth"></canvas>
        </div>
        <div class="bg-move-wrapper">
          <div class="bg-scale" :class="{active:blockChanged}">
            <div class="bg-move"></div>
            <div class="bg-circle-wrapper">
              <div class="bg-circle"></div>
            </div>
            <div class="bg-center-wrapper">
              <div class="bg-center"></div>
            </div>
          </div>
          <div class="bg-circle-wrapper1">
            <div class="bg-circle1"></div>
          </div>
          <div class="bg-circle-wrapper2">
            <div class="bg-circle2"></div>
          </div>
          <div class="bg-circle-wrapper3">
            <div class="bg-circle3"></div>
          </div>
          <div id="num" :class="{active: blockChanged}">
            <countTo  :startVal='old_block' :separator="','" :endVal='best_block' :duration='6000'></countTo>
          </div>
          <div>
            <!-- <div class="coin-item coin-item1"></div>
            <div class="coin-item coin-item2"></div>
            <div class="coin-item coin-item3"></div>
            <div class="coin-item coin-item4"></div>
            <div class="line-item line-item1">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="line-item line-item2">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="line-item line-item3">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="line-item line-item4">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div> -->
            <div class="line-item line-item6">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="line-item line-item7">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
            <div class="line-item line-item8">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>      
      <div class="latest-block animated" :class="{zoomIn:slideDown,zoomOut: !slideDown}">
        <div class="line-item line-item5">
              <div class="line"></div>
              <div class="circle">
                <div class="dot"></div>
              </div>
            </div>
        <h5 class="color-yellow" style="margin-bottom: 10px;">BEST BLOCK</h5>
        <div class="block latest-block-item"><span class="latest-block-item-title">Block Height:</span> {{block.height}}</div>
        <div class="latest-block-item">
          <div class="latest-block-item-title">Current Hash: </div>
          <Tooltip :class="'hash-tooltip'" :content="block.blockHash">
            <router-link :to="{path:'/block?blockHash='+block.blockHash}" class="ellipsis link">{{'[ ' + sliceStr(block.blockHash,10) + ' ]'}}</router-link>
          </Tooltip>
        </div>
        <div class="latest-block-item">
          <div class="latest-block-item-title">Parent Hash:</div>
          <Tooltip :class="'hash-tooltip'" :content="block.parentHash">
            <router-link :to="{path:'/block?blockHash='+block.parentHash}" class="ellipsis link">{{'[ ' + sliceStr(block.parentHash,10) + ' ]'}}</router-link>
          </Tooltip>
        </div>
        <div class="latest-block-item">
          <div class="latest-block-item-title">Mined By: </div>
          <Tooltip :class="'hash-tooltip'" :content="minerAddress">
            <router-link :to="{path:'/address/'+minerAddress}" class="ellipsis">{{'[ ' + sliceStr(minerAddress,6) + ' ]'}}</router-link>
            <!-- <span  style="display: block; max-width: 280px; font-size: 12px;" class="ellipsis">{{minerAddress}}</span> -->
          </Tooltip>
        </div>
        <div class="latest-block-item" style="line-height: 1em;"><span class="latest-block-item-title">Reward:</span> {{reward}}</div>
        <div class="latest-block-item">
          <div class="latest-block-item-title" style="width: 78px;">Node: </div>
          <div>{{'[ ' + (block.miner && block.miner.node) ? (block.miner && block.miner.node) : ''  + ' ]'}}</div>
          <!-- <div class="" style="max-height: 300px;overflow-y: auto;">
            <div style="14px; line-height: 14px;" class="f12" v-for="(item,index) in nodes" :key="item+index">{{item}}</div>
          </div> -->
        </div>
      </div>
      <!-- <div class="recent-blocks">
        <div class="block-title clear">
          <div class="blocks-text">Blocks</div>
          <div class="view-all" @click="toBlocks">View All</div>
        </div>
        <div class="block-inner animated">
          <div v-for="(item,index) of recentBlocks" :key="index" :class="{'block-item':true,clear:true,animated:true,'slideInDown': slideDown}" >
            <div class="float-left block-height" @click="toblock(item.height)">
              Block {{item.height}}
            </div>
            <div class="float-left block-info">
              <p>
                <router-link class="link" :to="{path:'/transaction?height='+item.txCount}">{{item.txCount}} txns</router-link>
                <router-link class="ellipsis block-item-hash link" :to="{path:'/block?blockHash='+item.blockHash}">
                  {{item.blockHash}}
                </router-link>
              </p>
              <p>{{item.age}}</p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="recent-blocks clear">
        <div class="view-all" @click="toBlocks">View All</div>
        <ul class="recent-block-list">
          <!-- {<li class="block-item color-b6f3f7 clear" :class="{animated:true,'slideInDown': slideDown, 'zoomIn': slideDown && !index}" v-for="(item,index) of recentThreeBlocks" :key="item.height">} -->
          <li class="block-item color-b6f3f7 clear" v-for="(item) of recentThreeBlocks" :key="item.height">  
            <div class="float-left block-item-left">
              <h3 class="block-item-height color-yellow">
                <router-link  class="color-yellow" :to="{name:'Block',query:{block: item.height}}">
                  [ {{ item.height }} ]
                </router-link>
              </h3>
              <div class="ellipsis">
                bcuid: {{item.miner.bcuid ? sliceStr(item.miner.bcuid,5) : ''}}
              </div>
              <div class="ellipsis">
                timestamp: {{item.age}}
              </div>
              <div class="block-item-txns ellipsis">
                <router-link :to="{name: 'Transaction', query:{height: item.height}}">
                  txn: {{item.txCount}} {{item.txCount > 1 ?'transactions' : 'transaction'}}
                </router-link>
              </div>
              <div class="ellipsis">
                avg tx time: {{item.avetx + ' ms'}}
              </div>
            </div>
            <div class="float-left block-item-right">
              <div class="block-item-right-inner clear ellipsis">
                <div class="float-left  ellipsis block-item-coin-address">{{sliceStr(item.coin_address,3)}}</div>
                <div class="float-left block-item-reward ellipsis">{{parseFloat(item.miner.reward) || '0'}}</div>
                <div class="float-left block-item-hash">
                  <div class="ellipsis block-item-block-hash">
                    <router-link :to="{name: 'Block',query: {blockHash: item.blockHash}}">{{sliceStr(item.blockHash)}}</router-link>
                  </div>
                  <div class="ellipsis block-item-parent-hash">
                    <router-link :to="{name: 'Block',query: {blockHash: item.parentHash}}">{{sliceStr(item.parentHash)}}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-bottom">
      <Bar />
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'iview';
import countTo from 'vue-count-to';
import Bar from './Bar';
import { refreshInterval } from '@/constant/constant'; 
import bus from '@/components/bus/bus'
var particles;
function sliceStr(str,length) {
  var result = '';
  if (!str) {
    return result;
  }
  str = str.toString();
  var len = str.length;
  if (len > length * 2) {
    result = str.slice(0,length) + '......' + str.slice(-1*length)
  } else if (len <= 8 ) {
    result = str;
  }else if (len <= 12) {
    result = str.slic(0,4) + '......' + str.slice(-4)
  }else if ( len <= 20 ) {
    result = str.slice(0,5) + '......' + str.slice(-5)
  }else {
    result = str.slice(0,6) + '......' + str.slice(-6)
  }
  return result;
}
function init() {
  function initParticles () {
    particles = Particles.init({
      selector: '.bg-particles',
      maxParticles:20,
      sizeVariations:3,
      speed: .8,
      color:'#f1f1f1',
      minDistance:500,
      connectParticles:true
    });
  }
  function initEarth () {
    (function() {
      var globe = planetaryjs.planet();
      // Load our custom `autorotate` plugin; see below.
      globe.loadPlugin(autorotate(10));
      // The `earth` plugin draws the oceans and the land; it's actually
      // a combination of several separate built-in plugins.
      //
      // Note that we're loading a special TopoJSON file
      // (world-110m-withlakes.json) so we can render lakes.
      globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { world: world },
        oceans:   { fill:   '#082137' },
        land:     { fill:   '#3C6679' },
        borders:  { stroke: '#3C6679' }
      }));
      // Load our custom `lakes` plugin to draw lakes; see below.
      globe.loadPlugin(lakes({
        fill: '#f1f1f1'
      }));
      // The `pings` plugin draws animated pings on the globe.
      globe.loadPlugin(planetaryjs.plugins.pings());
      // The `zoom` and `drag` plugins enable
      // manipulating the globe with the mouse.缩放
    //globe.loadPlugin(planetaryjs.plugins.zoom({
    //  scaleExtent: [100, 300]
    //}));
      globe.loadPlugin(planetaryjs.plugins.drag({
        // Dragging the globe should pause the
        // automatic rotation until we release the mouse.
        onDragStart: function() {
          this.plugins.autorotate.pause();
        },
        onDragEnd: function() {
          this.plugins.autorotate.resume();
        }
      }));
      // Set up the globe's initial scale, offset, and rotation.
      globe.projection.scale(100).translate([100,100]).rotate([0, -10, 0]);
    
      // Every few hundred milliseconds, we'll draw another random ping.
      //漂亮的圆圈
    var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
    setInterval(function() {
      var lat = Math.random() * 170 - 85;
      var lng = Math.random() * 360 - 180;
      var color = colors[Math.floor(Math.random() * colors.length)];
      globe.plugins.pings.add(lng, lat, { color: color, ttl: 4000, angle: Math.random() * 10 });
    }, 1200);
    
      var canvas = document.getElementById('earth');
      if (!canvas) {
        console.log('没有earth容器');
        return false;
      }
      var context;
      // Special code to handle high-density displays (e.g. retina, some phones)
      // In the future, Planetary.js will handle this by itself (or via a plugin).
      if (window.devicePixelRatio == 2) {
        canvas.width = 400;
        canvas.height = 400;
        context = canvas.getContext('2d');
        context.scale(2, 2);
      }else {
          context = canvas.getContext('2d');
          context.scale(2, 2);
      }
      // Draw that globe!
      globe.draw(canvas);
    
      // This plugin will automatically rotate the globe around its vertical
      // axis a configured number of degrees every second.
      function autorotate(degPerSec) {
        // Planetary.js plugins are functions that take a `planet` instance
        // as an argument...
        return function(planet) {
          var lastTick = null;
          var paused = false;
          planet.plugins.autorotate = {
            pause:  function() { paused = true;  },
            resume: function() { paused = false; }
          };
          // ...and configure hooks into certain pieces of its lifecycle.
          planet.onDraw(function() {
            if (paused || !lastTick) {
              lastTick = new Date();
            } else {
              var now = new Date();
              var delta = now - lastTick;
              // This plugin uses the built-in projection (provided by D3)
              // to rotate the globe each time we draw it.
              var rotation = planet.projection.rotate();
              rotation[0] += degPerSec * delta / 1000;
              if (rotation[0] >= 180) rotation[0] -= 360;
              planet.projection.rotate(rotation);
              lastTick = now;
            }
          });
        };
      };
    
      // This plugin takes lake data from the special
      // TopoJSON we're loading and draws them on the map.
      function lakes(options) {
        options = options || {};
        var lakes = null;
    
        return function(planet) {
          planet.onInit(function() {
            // We can access the data loaded from the TopoJSON plugin
            // on its namespace on `planet.plugins`. We're loading a custom
            // TopoJSON file with an object called "ne_110m_lakes".
            var world = planet.plugins.topojson.world;
            lakes = topojson.feature(world, world.objects.ne_110m_lakes);
          });
    
          planet.onDraw(function() {
            planet.withSavedContext(function(context) {
              context.beginPath();
              planet.path.context(context)(lakes);
              context.fillStyle = options.fill || 'black';
              context.fill();
            });
          });
        };
      };
    })();
  }
  initParticles();
  initEarth();
}
export default {
  components:{
    countTo,Bar,Tooltip
  },
  data() {
    return {
      old_block: 0,
      blockChanged: true,//区块高度是否改变
      slideDown: true,
      endVal: 0,
      block:{ height:0 },
      recentBlocks:[],
      isMounted: false,
      timer: null
    }
  },
  created () {
    var that = this;
  },
  updated () {
  },
  watch: {
    'block': function (val,oldVal) {
      var that = this;
      this.slideDown = false;
      if (oldVal && val) {
        if (oldVal.height) {
          this.old_block = oldVal.height;
        }
        if (oldVal.height == val.height) {
          this.slideDown = true;
        }else {
          this.blockChanged = true;
          that.slideDown = true;
          setTimeout(() => {
            that.blockChanged = false;
            that.slideDown = false;
          }, 4000);
        }
      }else {
        this.slideDown = true;
      }
      console.log(this.slideDown,'--------slidedown--------')
    }
  },
  mounted () {
    init();
    this.initLatest();
    this.initCoin();
    this.initRecentBlk();
    this.interval();
    this.initInterval();
  },
  computed: {
    best_block() {
      var block = this.block;
      if (block.height) {
        return block.height;
        // return this.accounting.formatNumber(block.height)
      }else {
        return 0;
      }
    },
    minerAddress () {
      var block = this.block;
      if (block.miner && block.miner.address) {
        return block.miner.address;
      } else {
        return '';
      }
    },
    reward () {
      var block = this.block;
      if (block.miner && block.miner.reward != undefined) {
        return this.accounting.formatNumber(block.miner.reward);
      }
    },
    nodes () {
      var block = this.block;
      if (block.nodes) {
        return block.nodes;
      } else {
        return [];
      }
    },
    recentThreeBlocks () {
      var recent = this.recentBlocks;
      var recentThree = [];
      if (recent.length) {
        recentThree = recent.filter((item, index) => {
          if (index <= 4) {
            if(item.miner && item.miner.address) {
              item.coin_address = item.miner.address
            }
            return item;
          }
        })
      }
      console.log(recentThree);
      return recentThree;
    }
  },
  destroyed (){
    if (particles) {
      particles.destroy();
    }
    if (this.timer ) {
      var timer = this.timer;
      clearInterval(timer);
    }
  },
  methods:{
    initInterval() {
      setInterval(()=>{
        window.location.reload();
      },1000*60*1);
    },
    sliceStr,
    initCoin () {
      function initCoinType(){
        var arr = ['BTC','ETH','BCH','XRP'];
        var items = document.getElementsByClassName('coin-item');
        for (var i = 0;i<items.length;i++) {
          var option = {
            strings:[arr[i]],
            typeSpeed:50,
            showCursor:false
          }
          var types = new Typed('.coin-item'+(i+1),option);
        }
      }
      function initType() {
        setTimeout(function () {
          initCoinType();
        },1700)
      }
      initType();
    },
    initLatest () {
      let that = this;
      axios({
        method:'post',
        url:'/block/blk/pbgtb.do'
      }).then((res) => {
        setTimeout(() => {
          that.slideDown = true;
        }, 5500);
        if (res.status == 200 && res.data.retCode == 1) {
          this.block = res.data.block.header;
          bus.$emit('getLastBlock',res.data.block.header)
          this.isMounted = true;
        } 
      }).catch((err) => {
        console.warn('err',err);
        this.slideDown = true;
        // this.block = {};
      })
    },
    initRecentBlk () {
      axios.post('/block/blk/pbgbb.do',{pageSize:10,pageNo:1}).then((res) => {
        if (res.status == 200 && res.data.retCode == 1 && res.data.blocks) {
          this.recentBlocks = res.data.blocks.map((item,index)=>{
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
        }
      }).catch((err) => {
        console.log('errr',err);
      })
      // 模拟数据
      // var arr = [];
      // for (let i = 0;i<4;i ++ ) {
      //   var obj = {
      //       "header": {
      //         "parentHash": "c4e47fce11a8439963bc6340930cebddeea4fcc8bb872ec2a9f7fcb596b4bf37",
      //         "timestamp": 1527949206346,
      //         "height": 116288,
      //         "reward": "00000006",
      //         "blockHash": "b736a1b6e8cfd8be416d21d9116508497fe1272c9a49e482a61f781866f4713e",
      //         "txCount": 0,
      //         "sliceId": 0,
      //         "age": '2 days ago',
      //         "coin_address": 'djflsxjffjdjfjdsfjldljfldfdsfs',
      //         "miner": {
      //             "bcuid": "fjldsjflddddfsfdfsfdjfldjfl",
      //             "nonce": 0,
      //             "balance": 6,
      //             "address": [
      //                 "DaImw96kiHle7nC0WeLNNnO8FukEa"
      //             ]
      //         }
      //       }
      //     }
      //   obj.header.height = 234 + i;
      //   arr.push(obj.header)
      // }
      // this.recentBlocks = arr;
    },
    toBlocks () {
      this.$router.push({
        path:'/blocks'
      })
    },
    toblock (height) {
      if (height || height == 0) {
        this.$router.push({
          path:'/block',
          query:{
            block:height
          }
        })
      } else {
        console.log('没有height数据');
      }
    },
    interval () {
      this.timer = setInterval (() => {
        this.initLatest();
        this.initRecentBlk();
      },refreshInterval);
    }
  }
}
</script>

<style lang="less" scoped>
  .latest-block {
    .ivu-tooltip {
      display: block;
      height: 14px;
      line-height: 14px;
    }
    position: absolute;
    top: 150px;
    left: 80px;
    // width: 300px;
    padding: 15px;
    background: rgba(60, 101, 125, 0.1);
    z-index: 999;
    color: #b6f3f7;
    .latest-block-item{
      margin-bottom: 8px;
      .latest-block-item-title {
        font-weight: 600;
        color: #b6f3f7;
      }
    }
    .block {
      font-size: 12px;
    }
    h4 {
      padding: 10px 0;
    }
    a {
      display: inline-block;
      vertical-align: middle;
      line-height: 1.2em;
      width: 240px;
      color: #9eeff3;
    }
  }
  // .recent-blocks {
  //   position: absolute;
  //   top: 80px;
  //   right: 20px;
  //   width: 340px;
  //   border: 1px solid #3b4b54;
  //   z-index: 999;
  //   .block-title {
  //     padding: 10px;
  //     border-bottom: 1px solid #3b4b54;
  //   }
  //   .blocks-text {
  //     line-height: 28px;
  //     float: left;
  //   }
  //   .view-all {
  //     float: right;
  //     border: 1px solid #fff;
  //     width: 80px;
  //     line-height: 28px;
  //     text-align: center;
  //     cursor: pointer;
  //     &:hover {
  //       background: rgba(60, 101, 125, .9);
  //       border-color: rgba(60, 101, 125, 0.9);
  //       color: #fff;
  //     }
  //   }
  //   .block-inner {
  //     min-height: 200px;
  //     max-height: 400px;
  //     overflow-y: auto;
  //     .block-item {
  //       padding: 10px;
  //       border-bottom: 1px solid #3b4b54;
  //     }
  //     .block-height {
  //       width: 120px;
  //       height: 50px;
  //       line-height: 50px;
  //       background:rgba(60,101,125,.6);
  //       color: #fff;
  //       text-align: center;
  //       cursor: pointer;
  //       &:hover {
  //         text-decoration: underline;
  //       }
  //     }
  //     .block-info {
  //       p {
  //         height: 24px;
  //         line-height: 24px;
  //         padding-left: 20px;
  //         color: #999;
  //         a {
  //           color: #9eeff3;
  //         }
  //         .block-item-hash {
  //           display: inline-block;
  //           vertical-align: middle;
  //           width: 105px;
  //         }
  //       }
  //     }
  //   }
  // }
  .recent-blocks {
    // border: 1px solid #f00;
    .view-all {
      float: right;
      border: 1px solid #fff;
      width: 80px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      position: relative;
      z-index: 99;
      &:hover {
        background: rgba(60, 101, 125, 0.2);
        border:1px solid rgba(60, 101, 125, 0.3);
        color: #fff;
      }
    }
    position: absolute;
    top: 110px;
    right: 5%;
    width: 460px;
    height: 560px;
    overflow: hidden;
    z-index: 9999999;
    .block-item {
      padding-bottom: 10px;
      .block-item-left {
        width: 160px;
      }
      .block-item-height {
        font-weight: 600;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          a {
            color: rgb(228, 157, 72);
          }
        }
      }
      .block-item-txns {
        a {
          color: #9eeff3;
        }
        & a:hover {
          text-decoration: underline;
        }
      }
      .block-item-right {
        background: rgba(60, 101, 125, 0.2);
        width: 290px;
        margin-top: 20px;
        padding: 2px 2px;
        margin-left: 8px;
        .block-item-coin-address {
          width: 90px;
          padding: 0 4px;
          min-height: 40px;
        }
        .block-item-reward {
          width: 50px;
          font-size: 18px;
          padding: 0 4px;
          color: #EB9938;
          line-height: 40px;
        }
        .block-item-coin-address {
          line-height: 40px;
        }
        .block-item-hash {
          width: 140px;
          padding: 0 4px;
          .block-item-block-hash,.block-item-parent-hash {
            height: 16px;
            line-height: 16px;
            margin-bottom:4px;
          }
          a {
            color: #9eeff3;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  .recent-block-list {
    transform: translateY(-250px);
    animation: recent 5s  1s ease-out both infinite;
  }
  @keyframes recent {
    0% {
      opacity: .3;
    }
    15% {
      opacity: 1;
    }
    80% {
      transform: translateY(0px);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: .3;
      transform: translateY(0px);
    }
  }
  @media screen and (min-width: 1640px){
    .recent-blocks {
      right: 7%;
    }
  }
</style>
