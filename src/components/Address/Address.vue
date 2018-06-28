<template>
  <div>
    <div class="nav-block">
      <div class="nav-block-inner wrapper clear">
        <div class="float-left">
          <span style="font-size: 16px;">Address</span>:  <span style="color: #aaa;">{{address}}</span>
        </div>
        <div class="float-right">
          <router-link :to="{path:'/'}">home</router-link> / Address
        </div>
      </div>
    </div>
    <div class="wrapper address-detail">
      <Row>
        <Col span="24">
          <div class="color-gray"><span>Balance: </span><span style="color: #9eeff3; font-size: 16px;">{{balance}}</span></div>
        </Col>
        <!-- <Col span="24">
          <span>USD Value: </span>{{usdBalance}}
        </Col> -->
        <Col span="24">
          <div class="color-gray"><span>Transctions: </span>{{data.length}}</div>
        </Col>
        </Col>
      </Row>
      <div class="txn">
        <div style="padding: 20px 0;font-size: 16px"><b>Transactions</b></div>  
        <!-- <Table class="table-list" :columns="columns" :data="data"></Table> -->
        <TableInfo :params="data"/>
      </div>      
    </div>
  </div>
</template>

<script>
import { Col, Row, Table } from 'iview';
import TableInfo from '../Transaction/tableinfo';
export default {
  components: {
    Col,Row,Table, TableInfo
  },
  data () {
    return {
      address:'',
      balance:'',
      columns:[
        {
          title:'TxHash',
          key:'txHash',
          className:'link',
          render: (h,params) => {
            return h('a',{
              on:{
                click: ()=> {
                  this.totx(params);
                }
              }
            },params.row.txHash)
          }
        },
        {
          title:'Block',
          key:'block',
          className:'link',
          render: (h,params) => {
            return h('a',{
              on:{
                click: ()=> {
                  this.toblock(params);
                }
              }
            },params.row.block)
          }
        },
        {
          title:'Age',
          key:'age',
          className:'text-color'
        },
        {
          title:'From',
          key:'from',
          render: (h,params) => {
            var className = '';
            if (this.address == params.row.from) {
              className = 'disabled';
            }else {
              className = 'link';
            }
            return h('a',{
              'class':className,
              on:{
                click: ()=> {
                  if (className.match('disabled')) {
                    return;
                  }else {
                    this.toaddress(params.row.from);
                  }
                }
              }
            },params.row.from)
          }
        },
        {
          title:'To',
          key:'to',
          render: (h,params) => {
            var className = '';
            if (this.address == params.row.to) {
              className = 'disabled';
            }else {
              className = 'link';
            }
            return h('a',{
              'class':className,
              on:{
                click: ()=> {
                  if (className.match('disabled')) {
                    return;
                  }else {
                    this.toaddress(params.row.to);
                  }
                }
              }
            },params.row.to)
          }
        },
        {
          title:'Value',
          key:'value',
          className:'text-color'
        },
        {
          title:'TxFee',
          key:'txFee',
          className:'text-color'
        }
      ],
      data:[]
    }
  },
  computed: {
    usdBalance () {
      var balance = this.balance;
      var rate = 6.23;
      var usdBalance = balance * rate;
      return usdBalance;
    }
  },
  mounted () {
    this.initTx();
  },
  methods: {
    initTx () {
      this.spinner.start();
      var that = this;
      if (this.$route.params.address) {
        this.address = this.$route.params.address
      }else {
        return;
      }
      var address = this.address;
      // address = '30cf53ea6787a84903a3c2ef250054a3abd129ab97';
      axios.post('/block/adr/pbgad.do',{address}).then((res) => {
        this.spinner.stop();
        if (res.status == 200 && res.data && res.data.retCode == 1 && res.data.address) {
          that.balance = res.data.address.balance || 0;
          that.data = res.data.address.transactions || [];
        }else {
          this.message.error('connection failed,please try again later');
        }
      }).catch((err) => {
        this.spinner.stop();
        this.message.error('connection failed,please try again later');
        console.log('address error',err);
      })
      this.data = [
        
      ]
    },
    totx ({row}) {
      this.$router.push({
        path:'/transactioninfo',
        query:{
          hash:row.txHash
        }
      })
    },
    toblock ({row}) {
      this.$router.push({
        path:'/block',
        query:{
          block:row.block
        }

      })
    },
    toaddress (value) {
      if (!value) {
        return;
      }
      this.address = value;
      this.$router.push({
        path:'/address/' + value
      })
    }
  }
}
</script>

<style lang="less" socped>
  .address-detail {
    .ivu-col {
      padding: 10px 0;
    }
  }
  .txn {
    margin-top: 20px;
  }
</style>
