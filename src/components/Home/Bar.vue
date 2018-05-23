<template>
  <div class="bar clear">
    <div class="bar-item">
      <div class="bar-container" id="bar0"></div>
    </div>
    <div class="bar-item">
      <div class="bar-container" id="bar1"></div>
    </div>
    <div class="bar-item">
      <div class="bar-container" id="bar2"></div>
    </div>
    <div class="bar-item">
      <div class="bar-container" id="bar3"></div>
    </div>
    <div class="bar-title-wrapper clear">
      <div class="bar-title">Week Transactions</div>
      <div class="bar-title">Day Transactions</div>
      <div class="bar-title">Hour Transactions</div>
      <div class="bar-title">10 minutes Transactions</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      barChart0:null,
      barChart1:null,
      barChart2:null,
      barChart3:null,
      week:[],
      day:[],
      hour:[],
      ten:[],
      timer:null
    }
  },
  mounted (){
    // this.init();
    this.initData();
    this.changeChart();
  },
  destroyed (){
    var timer = this.timer;
    if (timer) {
      clearInterval(timer);
    }
    this.timer = null;
  },
  methods:{
    initData () {
      axios.post('/block/adi/pbgtc.do').then((res) => {
        // console.log('bar-----bottom----');
        if (res.status == 200 && res.data.retCode == 1) {
          var data = res.data;
          this.week = data.week;
          this.day = data.day;
          this.hour = data.hour;
          this.ten = data.ten;
          this.init();
        }
      }).catch((err) => {
        // console.log('bar---failed',err);
      })
    },
    init(){
      this.barChart0 = echarts.init(document.getElementById('bar0'),'macarons');
      this.barChart1 = echarts.init(document.getElementById('bar1'),'macarons');
      this.barChart2 = echarts.init(document.getElementById('bar2'),'macarons');
      this.barChart3 = echarts.init(document.getElementById('bar3'),'macarons');
      var weekData = this.week;
      var dayData = this.day;
      var hourData = this.hour;
      var tenData = this.ten;
      // console.log(weekData,dayData,hourData,tenData);
      var data = {week:weekData,day:dayData,hour:hourData,ten:tenData};
      var arr = ['week','day','hour','ten'];
      for (let i = 0,len = arr.length;i < len;i++) {
        data[arr[i]] = {
          tooltip: {
            trigger: 'item',
            formatter:'{c}'
          },
          xAxis: {
            show:false,
            // type: 'category',
            data: [],
            axisLine:{
              onZero:false
            }
          },
          yAxis: {
              // type: 'value',
              show: false,
              boundaryGap:['5%','5%'],
          },
          series: [{
              data: data[arr[i]],
              name:'txn',
              // data:[{value:2},{value:0},{value:102},{value:233},{value:0},
              //   {value:90},{value:10},{value:22},{value:90},{value:0},
              //   {value:23},{value:90},{value:102},{value:90},{value:0},
              //   {value:233},{value:99},{value:90},{value:112},{value:0}
              // ],
              type: 'bar',
              barMaxWidth: 4,
              itemStyle:{
                color:function (params) {
                  if (params.value < 10) {
                    return '#f00'
                  }else if (params.value < 200){
                    return '#73C2E2';
                  }else {
                    return '#fff'
                  }
                }
              }
          }],
          grid:{
            left:'2%',
            right:0,
            top:0,
            bottom:'2%'
          },
          color:['#fff']
        };
        var self = this;
        // console.log('option data-----',data[arr[i]]);
        self['barChart'+i].setOption(data[arr[i]]);
      }
    },
    changeChart (){
      let that = this;
      this.timer = setInterval(()=>{
        that.initData();
      },3000);
    },
    reInit () {
      
    }
  }
}
</script>

<style scoped lang="less">
  .bar {
    width: 1360px;
    min-width: 1360px;
    margin: 0 auto;
    .bar-item {
      margin-right: 35px;
      float: left;
      width: 300px;
      height: 110px;
      .bar-container {
        width: 300px;
        height: 80px;
      }
    }
    .bar-title-wrapper {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      .bar-title {
        width: 25%;
        float: left;
        height: 30px;
        line-height: 30px;
        background: #1E2E38;
        color: #9eeff3;
        text-align: center;
      }
    }
  }
</style>
