webpackJsonp([0],{WBHA:function(t,i,e){var a;a=function(){return function(t){function i(a){if(e[a])return e[a].exports;var s=e[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,i),s.l=!0,s.exports}var e={};return i.m=t,i.c=e,i.i=function(t){return t},i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="/dist/",i(i.s=2)}([function(t,i,e){var a=e(4)(e(1),e(5),null,null);t.exports=a.exports},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(3);i.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,i,e,a){return e*(1-Math.pow(2,-10*t/a))*1024/1023+i}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,a.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,a.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,a.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,a.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var i=t-this.startTime;this.remaining=this.localDuration-i,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(i,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(i,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(i/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(i/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),i<this.localDuration?this.rAF=(0,a.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var i=(t+="").split("."),e=i[0],a=i.length>1?this.decimal+i[1]:"",s=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;s.test(e);)e=e.replace(s,"$1"+this.separator+"$2");return this.prefix+e+a+this.suffix}},destroyed:function(){(0,a.cancelAnimationFrame)(this.rAF)}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(e(0));i.default=a.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",a.default)},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=0,s="webkit moz ms o".split(" "),n=void 0,r=void 0;if("undefined"==typeof window)i.requestAnimationFrame=n=function(){},i.cancelAnimationFrame=r=function(){};else{i.requestAnimationFrame=n=window.requestAnimationFrame,i.cancelAnimationFrame=r=window.cancelAnimationFrame;for(var l=void 0,o=0;o<s.length&&(!n||!r);o++)l=s[o],i.requestAnimationFrame=n=n||window[l+"RequestAnimationFrame"],i.cancelAnimationFrame=r=r||window[l+"CancelAnimationFrame"]||window[l+"CancelRequestAnimationFrame"];n&&r||(i.requestAnimationFrame=n=function(t){var i=(new Date).getTime(),e=Math.max(0,16-(i-a)),s=window.setTimeout(function(){t(i+e)},e);return a=i+e,s},i.cancelAnimationFrame=r=function(t){window.clearTimeout(t)})}i.requestAnimationFrame=n,i.cancelAnimationFrame=r},function(t,i){t.exports=function(t,i,e,a){var s,n=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(s=t,n=t.default);var l="function"==typeof n?n.options:n;if(i&&(l.render=i.render,l.staticRenderFns=i.staticRenderFns),e&&(l._scopeId=e),a){var o=Object.create(l.computed||null);Object.keys(a).forEach(function(t){var i=a[t];o[t]=function(){return i}}),l.computed=o}return{esModule:s,exports:n,options:l}}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement;return(t._self._c||i)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},t.exports=a()},ajwO:function(t,i){},"d/7G":function(t,i){},wqTG:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("BTaQ"),s=e("WBHA"),n=e.n(s),r=e("EAa/"),l={data:function(){return{barChart0:null,barChart1:null,barChart2:null,barChart3:null,week:[],day:[],hour:[],ten:[],timer:null}},mounted:function(){this.init(),this.initData(),this.changeChart()},destroyed:function(){var t=this.timer;t&&clearInterval(t),this.timer=null},methods:{initData:function(){var t=this;axios.post("/block/adi/pbgtc.do").then(function(i){if(200==i.status&&1==i.data.retCode){var e=i.data;t.week=e.week,t.day=e.day,t.hour=e.hour,t.ten=e.ten,t.init()}}).catch(function(t){})},init:function(){this.barChart0=echarts.init(document.getElementById("bar0"),"macarons"),this.barChart1=echarts.init(document.getElementById("bar1"),"macarons"),this.barChart2=echarts.init(document.getElementById("bar2"),"macarons"),this.barChart3=echarts.init(document.getElementById("bar3"),"macarons");for(var t={week:this.week,day:this.day,hour:this.hour,ten:this.ten},i=["week","day","hour","ten"],e=0,a=i.length;e<a;e++){t[i[e]]={tooltip:{trigger:"item",formatter:"{c}"},xAxis:{show:!1,data:[],axisLine:{onZero:!1}},yAxis:{show:!1,boundaryGap:["5%","5%"]},series:[{data:t[i[e]],name:"txn",type:"bar",barMaxWidth:4,itemStyle:{color:function(t){return t.value<10?"#f00":t.value<200?"#73C2E2":"#fff"}}}],grid:{left:"2%",right:0,top:0,bottom:"2%"},color:["#fff"]};this["barChart"+e].setOption(t[i[e]])}},changeChart:function(){var t=this;this.timer=setInterval(function(){t.initData()},4*r.a)},reInit:function(){}}},o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"bar clear"},[e("div",{staticClass:"bar-item"},[e("div",{staticClass:"bar-container",attrs:{id:"bar0"}})]),t._v(" "),e("div",{staticClass:"bar-item"},[e("div",{staticClass:"bar-container",attrs:{id:"bar1"}})]),t._v(" "),e("div",{staticClass:"bar-item"},[e("div",{staticClass:"bar-container",attrs:{id:"bar2"}})]),t._v(" "),e("div",{staticClass:"bar-item"},[e("div",{staticClass:"bar-container",attrs:{id:"bar3"}})]),t._v(" "),e("div",{staticClass:"bar-title-wrapper clear"},[e("div",{staticClass:"bar-title"},[t._v("Week Transactions")]),t._v(" "),e("div",{staticClass:"bar-title"},[t._v("Day Transactions")]),t._v(" "),e("div",{staticClass:"bar-title"},[t._v("Hour Transactions")]),t._v(" "),e("div",{staticClass:"bar-title"},[t._v("10 minutes Transactions")])])])}]};var c,u=e("VU/8")(l,o,!1,function(t){e("ajwO")},"data-v-8c811fe0",null).exports,d=e("qSuq");var h={components:{countTo:n.a,Bar:u,Tooltip:a.Tooltip},data:function(){return{old_block:0,blockChanged:!0,slideDown:!0,endVal:0,block:{height:0},recentBlocks:[],isMounted:!1,timer:null}},created:function(){},updated:function(){},watch:{block:function(t,i){var e=this;this.slideDown=!1,i&&t&&(i.height&&(this.old_block=i.height),i.height==t.height?setTimeout(function(){e.blockChanged=!1,e.slideDown=!1},1e3):(this.blockChanged=!0,e.slideDown=!0))}},mounted:function(){c=Particles.init({selector:".bg-particles",maxParticles:15,sizeVariations:3,speed:.2,color:"#f1f1f1",minDistance:500,connectParticles:!0}),function(){var t,i=planetaryjs.planet();i.loadPlugin((t=10,function(i){var e=null,a=!1;i.plugins.autorotate={pause:function(){a=!0},resume:function(){a=!1}},i.onDraw(function(){if(a||!e)e=new Date;else{var s=new Date,n=s-e,r=i.projection.rotate();r[0]+=t*n/1e3,r[0]>=180&&(r[0]-=360),i.projection.rotate(r),e=s}})})),i.loadPlugin(planetaryjs.plugins.earth({topojson:{world:world},oceans:{fill:"#082137"},land:{fill:"#3C6679"},borders:{stroke:"#3C6679"}})),i.loadPlugin(function(t){t=t||{};var i=null;return function(e){e.onInit(function(){var t=e.plugins.topojson.world;i=topojson.feature(t,t.objects.ne_110m_lakes)}),e.onDraw(function(){e.withSavedContext(function(a){a.beginPath(),e.path.context(a)(i),a.fillStyle=t.fill||"black",a.fill()})})}}({fill:"#f1f1f1"})),i.loadPlugin(planetaryjs.plugins.pings()),i.loadPlugin(planetaryjs.plugins.drag({onDragStart:function(){this.plugins.autorotate.pause()},onDragEnd:function(){this.plugins.autorotate.resume()}})),i.projection.scale(100).translate([100,100]).rotate([0,-10,0]);var e=["red","yellow","white","orange","green","cyan","pink"];setInterval(function(){var t=170*Math.random()-85,a=360*Math.random()-180,s=e[Math.floor(Math.random()*e.length)];i.plugins.pings.add(a,t,{color:s,ttl:4e3,angle:10*Math.random()})},1200);var a=document.getElementById("earth");if(!a)return console.log("没有earth容器"),!1;2==window.devicePixelRatio?(a.width=400,a.height=400,a.getContext("2d").scale(2,2)):a.getContext("2d").scale(2,2),i.draw(a)}(),this.initLatest(),this.initCoin(),this.initRecentBlk(),this.interval()},computed:{best_block:function(){var t=this.block;return t.height?t.height:0},minerAddress:function(){var t=this.block;return t.miner&&t.miner.bcuid?t.miner.bcuid:""},reward:function(){var t=this.block;if(t.miner&&void 0!=t.miner.reward)return this.accounting.formatNumber(t.miner.reward)},nodes:function(){var t=this.block;return t.nodes?t.nodes:[]},recentThreeBlocks:function(){var t=this.recentBlocks,i=[];return t.length&&(i=t.filter(function(t,i){if(console.log(t,"--------",i),i<=3&&i>=1)return t.miner&&t.miner.address&&(t.coin_address=t.miner.address),t})),console.log(i),i}},destroyed:function(){if(c&&c.destroy(),this.timer){var t=this.timer;clearInterval(t)}},methods:{sliceStr:function(t,i){var e="";if(!t)return e;var a=(t=t.toString()).length;return e=a>2*i?t.slice(0,i)+"......"+t.slice(-1*i):a<=8?t:a<=12?t.slic(0,4)+"......"+t.slice(-4):a<=20?t.slice(0,5)+"......"+t.slice(-5):t.slice(0,6)+"......"+t.slice(-6)},initCoin:function(){setTimeout(function(){!function(){for(var t=["BTC","ETH","BCH","XRP"],i=document.getElementsByClassName("coin-item"),e=0;e<i.length;e++)new Typed(".coin-item"+(e+1),{strings:[t[e]],typeSpeed:50,showCursor:!1})}()},1700)},initLatest:function(){var t=this;axios({method:"post",url:"/block/blk/pbgtb.do"}).then(function(i){200==i.status&&1==i.data.retCode&&(t.block=i.data.block.header,d.a.$emit("getLastBlock",i.data.block.header),t.isMounted=!0)}).catch(function(t){console.warn("err",t)})},initRecentBlk:function(){var t=this;axios.post("/block/blk/pbgbb.do",{pageSize:10,pageNo:1}).then(function(i){console.log("-------------",i),200==i.status&&1==i.data.retCode&&i.data.blocks&&(t.recentBlocks=i.data.blocks.map(function(i,e){var a=i.header,s=(new Date).getTime(),n=Math.floor((s-a.timestamp)/1e3);return a.age=n<=10?n+"s ago":t.timeago().format(a.timestamp),a}))}).catch(function(t){console.log("errr",t)})},toBlocks:function(){this.$router.push({path:"/blocks"})},toblock:function(t){t||0==t?this.$router.push({path:"/block",query:{block:t}}):console.log("没有height数据")},interval:function(){var t=this;this.timer=setInterval(function(){t.initLatest(),t.initRecentBlk()},r.a)}}},m={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"header-main"},[e("div",{staticClass:"home-mask"}),t._v(" "),t._m(0),t._v(" "),e("div",{staticStyle:{width:"1000px",margin:"auto",position:"relative","z-index":"999"}},[t._m(1),t._v(" "),e("div",{staticClass:"bg-move-wrapper"},[e("div",{staticClass:"bg-scale",class:{active:t.blockChanged}},[e("div",{staticClass:"bg-move"}),t._v(" "),t._m(2),t._v(" "),t._m(3)]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),e("div",{attrs:{id:"num"}},[e("countTo",{attrs:{startVal:t.old_block,separator:",",endVal:t.best_block,duration:3e3}})],1),t._v(" "),t._m(7)])]),t._v(" "),e("div",{staticClass:"latest-block"},[t._m(8),t._v(" "),e("h5",{staticClass:"color-yellow",staticStyle:{"margin-bottom":"10px"}},[t._v("BEST BLOCK")]),t._v(" "),e("div",{staticClass:"block latest-block-item"},[e("span",{staticClass:"latest-block-item-title"},[t._v("Block Height:")]),t._v(" "+t._s(t.block.height))]),t._v(" "),e("div",{staticClass:"latest-block-item"},[e("div",{staticClass:"latest-block-item-title"},[t._v("Current Hash: ")]),t._v(" "),e("Tooltip",{class:"hash-tooltip",attrs:{content:t.block.blockHash}},[e("router-link",{staticClass:"ellipsis",attrs:{to:{path:"/block?blockHash="+t.block.blockHash}}},[t._v(t._s("[ "+t.sliceStr(t.block.blockHash,10)+" ]"))])],1)],1),t._v(" "),e("div",{staticClass:"latest-block-item"},[e("div",{staticClass:"latest-block-item-title"},[t._v("Parent Hash:")]),t._v(" "),e("Tooltip",{class:"hash-tooltip",attrs:{content:t.block.parentHash}},[e("router-link",{staticClass:"ellipsis",attrs:{to:{path:"/block?blockHash="+t.block.parentHash}}},[t._v(t._s("[ "+t.sliceStr(t.block.parentHash,10)+" ]"))])],1)],1),t._v(" "),e("div",{staticClass:"latest-block-item"},[e("div",{staticClass:"latest-block-item-title"},[t._v("Mined By: ")]),t._v(" "),e("Tooltip",{class:"hash-tooltip",attrs:{content:t.minerAddress}},[e("router-link",{staticClass:"ellipsis",attrs:{to:{path:"/address/"+t.minerAddress}}},[t._v(t._s("[ "+t.sliceStr(t.minerAddress,6)+" ]"))])],1)],1),t._v(" "),e("div",{staticClass:"latest-block-item",staticStyle:{"line-height":"1em"}},[e("span",{staticClass:"latest-block-item-title"},[t._v("Reward:")]),t._v(" "+t._s(t.reward))]),t._v(" "),e("div",{staticClass:"latest-block-item"},[e("div",{staticClass:"latest-block-item-title",staticStyle:{width:"78px"}},[t._v("Node: ")]),t._v(" "),e("div",[t._v(t._s(t.block.miner&&t.block.miner.node))])])]),t._v(" "),e("div",{staticClass:"recent-blocks clear"},[e("div",{staticClass:"view-all",on:{click:t.toBlocks}},[t._v("View All")]),t._v(" "),e("ul",t._l(t.recentThreeBlocks,function(i){return e("li",{key:i.height,staticClass:"block-item color-b6f3f7 clear",class:{animated:!0,slideInDown:t.slideDown}},[e("div",{staticClass:"float-left block-item-left"},[e("h3",{staticClass:"block-item-height color-yellow"},[e("router-link",{staticClass:"color-yellow",attrs:{to:{name:"Block",query:{block:i.height}}}},[t._v("\n                [ "+t._s(i.height)+" ]\n              ")])],1),t._v(" "),e("div",{staticClass:"ellipsis"},[t._v("\n              bcuid: "+t._s(i.miner.bcuid?t.sliceStr(i.miner.bcuid):"")+"\n            ")]),t._v(" "),e("div",{staticClass:"ellipsis"},[t._v("\n              timestamp: "+t._s(i.age)+"\n            ")]),t._v(" "),e("div",{staticClass:"block-item-txns ellipsis"},[e("router-link",{attrs:{to:{name:"Transaction",query:{height:i.height}}}},[t._v("\n                txn: "+t._s(i.txCount)+" "+t._s(i.txCount>1?"transactions":"transaction")+"\n              ")])],1),t._v(" "),e("div",{staticClass:"ellipsis"},[t._v("\n              avg tx time: "+t._s(i.avetx+" ms")+"\n            ")])]),t._v(" "),e("div",{staticClass:"float-left block-item-right"},[e("div",{staticClass:"block-item-right-inner clear ellipsis"},[e("div",{staticClass:"float-left  ellipsis block-item-coin-address"},[t._v(t._s(t.sliceStr(i.coin_address,3)))]),t._v(" "),e("div",{staticClass:"float-left block-item-reward ellipsis"},[t._v(t._s(parseFloat(i.reward)?parseFloat(i.reward):"0"))]),t._v(" "),e("div",{staticClass:"float-left block-item-hash"},[e("div",{staticClass:"ellipsis block-item-block-hash"},[e("router-link",{attrs:{to:{name:"Block",query:{blockHash:i.blockHash}}}},[t._v(t._s(t.sliceStr(i.blockHash)))])],1),t._v(" "),e("div",{staticClass:"ellipsis block-item-parent-hash"},[e("router-link",{attrs:{to:{name:"Block",query:{blockHash:i.parentHash}}}},[t._v(t._s(t.sliceStr(i.parentHash)))])],1)])])])])}))])]),t._v(" "),e("div",{staticClass:"header-bottom"},[e("Bar")],1)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"particles-wrapper"},[i("canvas",{staticClass:"bg-particles"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bg-earth"},[i("canvas",{staticClass:"earth",staticStyle:{width:"410px",height:"410px"},attrs:{id:"earth",width:"410",height:"410"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bg-circle-wrapper"},[i("div",{staticClass:"bg-circle"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bg-center-wrapper"},[i("div",{staticClass:"bg-center"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bg-circle-wrapper1"},[i("div",{staticClass:"bg-circle1"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bg-circle-wrapper2"},[i("div",{staticClass:"bg-circle2"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bg-circle-wrapper3"},[i("div",{staticClass:"bg-circle3"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("div",{staticClass:"line-item line-item6"},[i("div",{staticClass:"line"}),this._v(" "),i("div",{staticClass:"circle"},[i("div",{staticClass:"dot"})])]),this._v(" "),i("div",{staticClass:"line-item line-item7"},[i("div",{staticClass:"line"}),this._v(" "),i("div",{staticClass:"circle"},[i("div",{staticClass:"dot"})])]),this._v(" "),i("div",{staticClass:"line-item line-item8"},[i("div",{staticClass:"line"}),this._v(" "),i("div",{staticClass:"circle"},[i("div",{staticClass:"dot"})])])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"line-item line-item5"},[i("div",{staticClass:"line"}),this._v(" "),i("div",{staticClass:"circle"},[i("div",{staticClass:"dot"})])])}]};var v=e("VU/8")(h,m,!1,function(t){e("d/7G")},"data-v-5cae97d8",null);i.default=v.exports}});
//# sourceMappingURL=0.388ba15c9d4aa32329c8.js.map