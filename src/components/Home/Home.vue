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
          <div id="num" style="font-size: 16px;">
            <countTo  v-if="!isMounted" :startVal='0' :endVal='block.height' :duration='3000'></countTo>
            <div v-else>{{block.height}}</div>
          </div>
          <!-- <div>
            <div class="coin-item coin-item1"></div>
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
            </div>
          </div> -->
        </div>
      </div>      
      <div class="latest-block">
        <h4 class="color-yellow">BEST BLOCK</h4>
        <div class="block">Block Height {{block.height}}</div>
        <div>Current Hash: 
          <Tooltip :class="'hash-tooltip'" :content="block.blockHash">
            <router-link :to="{path:'/block?blockHash='+block.blockHash}" class="ellipsis">{{block.blockHash}}</router-link>
          </Tooltip>
        </div>
        <div>Parent Hash:
          <Tooltip :class="'hash-tooltip'" :content="block.parentHash">
            <router-link :to="{path:'/block?blockHash='+block.parentHash}" class="ellipsis">{{block.parentHash}}</router-link>
          </Tooltip>
        </div>
        <div>Mined By: 
          <Tooltip :class="'hash-tooltip'" :content="minerAddress">
            <router-link :to="{path:'/address/'+minerAddress}" class="ellipsis">{{minerAddress}}</router-link>
          </Tooltip>
        </div>
        <div style="line-height: 2em;">Reward: {{accountBalance}}</div>
        <div>
          <div class="float-left" style="width: 78px;">Nodes: </div>
          <div class="float-left" style="max-height: 300px;overflow-y: auto;">
            <div class="f12" v-for="(item,index) in nodes" :key="item+index">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="recent-blocks">
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
var particles;
function init() {
  function initParticles () {
    particles = Particles.init({
      selector: '.bg-particles',
      maxParticles:15,
      sizeVariations:3,
      speed:0.2,
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
  data () {
    return {
      blockChanged:true,//区块高度是否改变
      slideDown:true,
      endVal:0,
      block:{height:0},
      recentBlocks:[],
      isMounted:false,
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
      that.slideDown = false;
      if (oldVal && val) {
        console.log(val,oldVal);
        if (oldVal.height == val.height) {
          setTimeout(() => {
            that.blockChanged = false;
            that.slideDown = false;
          }, 1000);
        }else {
          this.blockChanged = true;
          that.slideDown = true;
        }
      }
    }
  },
  mounted () {
    init();
    this.initLatest();
    this.initCoin();
    this.initRecentBlk();
    this.interval();
  },
  computed: {
    minerAddress () {
      var block = this.block;
      if (block.miner && block.miner.address.length) {
        return block.miner.address[0]
      }
    },
    accountBalance () {
      var block = this.block;
      if (block.miner && block.miner.balance != undefined) {
        return block.miner.balance;
      }
    },
    nodes () {
      var block = this.block;
      if (block.nodes) {
        return block.nodes;
      }
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
      axios({
        method:'post',
        url:'/block/blk/pbgtb.do'
      }).then((res) => {
        if (res.status == 200 && res.data.retCode == 1) {
          this.block = res.data.block.header;
          this.isMounted = true;
        } 
      }).catch((err) => {
        console.warn('err',err);
        // this.block = {};
      })
    },
    initRecentBlk () {
      axios.post('/block/blk/pbgbb.do',{pageSize:10,pageNo:1}).then((res) => {
        console.log('-------------',res);
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
    },
    toBlocks () {
      this.$router.push({
        path:'/blocks'
      })
    },
    toblock (height) {
      if (height) {
        this.$router.push({
          path:'/block',
          query:{
            block:height
          }
        })
      }else {
        console.log('没有height数据');
      }
    },
    interval () {
      this.timer = setInterval (() => {
        this.initLatest();
        this.initRecentBlk();
      },2000);
    }
  }
}
</script>

<style lang="less" scoped>
  .latest-block {
    position: absolute;
    top: 100px;
    left: 100px;
    // width: 300px;
    z-index: 999;
    .block {
      font-size: 16px;
      height: 30px;
      line-height: 30px;
    }
    h4 {
      padding: 10px 0;
    }
    a {
      display: inline-block;
      vertical-align: middle;
      line-height: 2em;
      width: 240px;
      color: #9eeff3;
    }
  }
  .recent-blocks {
    position: absolute;
    top: 80px;
    right: 20px;
    width: 340px;
    border: 1px solid #3b4b54;
    z-index: 999;
    .block-title {
      padding: 10px;
      border-bottom: 1px solid #3b4b54;
    }
    .blocks-text {
      line-height: 28px;
      float: left;
    }
    .view-all {
      float: right;
      border: 1px solid #fff;
      width: 80px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
    }
    .block-inner {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
      .block-item {
        padding: 10px;
        border-bottom: 1px solid #3b4b54;
      }
      .block-height {
        width: 120px;
        height: 50px;
        line-height: 50px;
        background:rgba(60,101,125,.6);
        color: #fff;
        text-align: center;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .block-info {
        p {
          height: 24px;
          line-height: 24px;
          padding-left: 20px;
          color: #999;
          a {
            color: #9eeff3;
          }
          .block-item-hash {
            display: inline-block;
            vertical-align: middle;
            width: 105px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 1640px){
    .recent-blocks {
      right: 7%;
    }
  }
</style>
