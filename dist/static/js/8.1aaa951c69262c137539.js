webpackJsonp([8],{a8p3:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("BTaQ"),s=a("uL3Z"),i={components:{Table:o.Table,Input:o.Input},data:function(){var t=this;return{columns1:[{title:"节点名称",key:"name"},{title:"hash",key:"hash"},{title:"height",key:"height"},{title:"time",key:"time"}],data1:[{name:"BEST BLOCK",hash:18,height:"New York No. 1 Lake Park",time:"2016-10-03"},{name:"BEST BLOCK",hash:18,height:"New York No. 1 Lake Park",time:"2016-10-03"},{name:"BEST BLOCK",hash:18,height:"New York No. 1 Lake Park",time:"2016-10-03"},{name:"BEST BLOCK",hash:18,height:"New York No. 1 Lake Park",time:"2016-10-03"},{name:"BEST BLOCK",hash:18,height:"New York No. 1 Lake Park",time:"2016-10-03"},{name:"BEST BLOCK",hash:18,height:"New York No. 1 Lake Park",time:"2016-10-03"}],height_title:[{name:"TxHash",key:"txHash"},{name:"Block Height:",key:"blockHeight"},{name:"TimeStamp",key:"timeStamp"},{name:"Status",key:"status"},{name:"From",key:"froms"},{name:"To",key:"tos"},{name:"Data",key:"data"}],blockinfo:{},column_to:[{title:"Address",key:"address",render:function(e,a){return e("a",{on:{click:function(){t.show(a)}}},a.row.address)}},{title:"Amount",key:"amount",className:"text-color"},{title:"Symbol",key:"symbol",className:"text-color"},{title:"cryptoToken",key:"cryptoToken",className:"text-color"}],data_to:[],column_from:[{title:"Address",key:"address",render:function(e,a){return e("a",{on:{click:function(){t.show(a)}}},a.row.address)}},{title:"Amount",key:"amount",className:"text-color"},{title:"Fee",key:"fee",className:"text-color"},{title:"FeeLimit",key:"feeLimit",className:"text-color"},{title:"Token",key:"token",className:"text-color"},{title:"Symbol",key:"symbol",className:"text-color"},{title:"cryptoToken",key:"cryptoToken",className:"text-color"}],data_from:[]}},mounted:function(){this.routeinfo()},watch:{$route:"routeinfo"},methods:{routeinfo:function(){var t=this;this.spinner.start();var e=this;axios({method:"post",url:"/block/trs/pbgtt.do",data:{txHash:this.$route.query.txhash}}).then(function(a){t.spinner.stop(),"200"==a.status&&a.data&&a.data.transaction?(e.blockinfo=a.data.transaction,"null"==e.blockinfo.status&&(e.blockinfo.status="peding"),e.data_to=a.data.transaction.tos,e.data_from=a.data.transaction.froms):s.a.error("区块详情查询失败",3)}).catch(function(e){t.spinner.stop(),s.a.error("区块详情查询失败",3)})},onClicks:function(t,e){console.log(t+"---",e),"blockHeight"==e&&this.$router.push({path:"/block",query:{block:t.blockHeight}})},show:function(t){this.$router.push("/address/"+t.row.address)}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"node-list"},[a("div",{staticClass:"nav-block"},[a("div",{staticClass:"nav-block-inner wrapper clear"},[a("div",{staticClass:"float-left"},[t._v("\n          TxHash:  "+t._s(t.$route.query.txhash)+"\n        ")]),t._v(" "),a("div",{staticClass:"float-right"},[a("router-link",{attrs:{to:{path:"/"}}},[t._v("home")]),t._v(" / "),a("router-link",{attrs:{to:{path:"/transaction",query:{height:t.$route.query.height}}}},[t._v("Transaction")]),t._v(" / Transactioninfo\n        ")],1)])]),t._v(" "),a("div",{staticClass:"block-info"},[a("div",{staticClass:"block-title"},[t._v("\n            Transaction Information\n        ")]),t._v(" "),a("div",{staticClass:"infomation"},t._l(t.height_title,function(e,o){return a("div",{key:o},[a("div",{directives:[{name:"show",rawName:"v-show",value:"froms"==e.key,expression:"item.key=='froms'"}]},[a("div",{staticStyle:{"vertical-align":"top",display:"inline-block",width:"200px"}},[t._v("\n                        "+t._s(e.name)+" :\n                    ")]),t._v(" "),a("Table",{staticClass:"table-list inside-table",attrs:{columns:t.column_from,data:t.data_from}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"tos"==e.key,expression:"item.key=='tos'"}]},[a("div",{staticStyle:{"vertical-align":"top",display:"inline-block",width:"200px"}},[t._v("\n                        "+t._s(e.name)+" :\n                    ")]),t._v(" "),a("Table",{staticClass:"table-list inside-table",staticStyle:{"margin-bottom":"10px"},attrs:{columns:t.column_to,data:t.data_to}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"froms"!=e.key&&"data"!=e.key&&"tos"!=e.key,expression:"item.key!='froms' && item.key!='data' && item.key!='tos'"}]},[a("span",{staticClass:"sp1"},[t._v(t._s(e.name)+" :")]),t._v(" "),a("span",{class:"blockHeight"==e.key?"span-click":"",on:{click:function(a){"blockHeight"==e.key&&t.onClicks(t.blockinfo,e.key)}}},[a("span",{directives:[{name:"show",rawName:"v-show",value:"timeStamp"==e.key,expression:"item.key =='timeStamp'"}]},[t._v(t._s(t.timeago().format(t.blockinfo.timeStamp)))]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:"timeStamp"!=e.key,expression:"item.key !='timeStamp'"}]},[t._v(t._s(t.blockinfo[e.key]))])])])])}))])])},staticRenderFns:[]};var r=a("VU/8")(i,n,!1,function(t){a("llFi")},null,null);e.default=r.exports},llFi:function(t,e){}});
//# sourceMappingURL=8.1aaa951c69262c137539.js.map