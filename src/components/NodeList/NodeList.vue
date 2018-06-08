<template>
  <div>
    <div class="nav-block">
      <div class="wrapper clear">
        <div class="float-left">
          Nodes
        </div>
        <div class="float-right">
          <router-link to="/">home</router-link> / Nodes
        </div>
      </div>
    </div>
    <div class="wrapper"> 
      <Table class="table-list" :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
import { Table } from 'iview';
export default {
  components: {
    Table
  },
  data () {
    return {
      columns:[
        {
          title:'Node Name',
          key:'node_name',
          className:'text-color'
        },
        {
          title:'Node URI',
          key:'uri',
          className:'text-color'
        },
        {
          title:'Start Time',
          key:'startup_time',
          className:'text-color'
        },
        {
          title:'Receive Count',
          key:'recv_cc',
          className:'text-color'
        },
        {
          title:'Send Count',
          key:'send_cc',
          className:'text-color'
        },
        {
          title:'Node Id',
          key:'node_idx',
          className:'text-color'
        },
        {
          title:'Block Count',
          key:'block_cc',
          className:'text-color'
        },
        {
          title:'Status',
          key:'status',
          className:'text-color'
        }
      ],
      data:[]
    }
  },
  mounted () {
    this.initData();
  },
  watch:{
    '$route':function () {
      var status = this.$route.query.status;
      this.initData(status);
    }
  },
  methods:{
    initData (status) {
      this.spinner.start();
      if (!status) {
        status = this.$route.query.status;
      }
      axios.post('/block/adi/pbgns.do').then((res) => {
        this.spinner.stop();
        console.log('node node node list',res,res.data);
        if (res.status == 200 && res.data && res.data.retCode  == 1) {
          if (res.data.nodes && res.data.nodes.length) {
            this.data = res.data.nodes.filter((item,index) => {
              var now = new Date().getTime();
              var age = Math.floor((now - item.startup_time)/1000);
              if (age <= 10) {
                  item.startup_time = age + 's ago';
              }else {
                  item.startup_time = this.timeago().format(item.startup_time);
              }
              item.status = item.status.toLowerCase();
              console.log('status',status,item.status);
              if (status == 'pending') {
                return item.status == 'pending';
              }else if (status == 'dpos') {
                return item.status == 'direct';
              }else {
                return item.status != '';
              }
            })
          }
        }else {
          this.message.error('Unable to get nodes');
        }
      }).catch((err) => {
        this.spinner.stop();
        this.message.error('connection failed, please try again later');
      })
    }
  }
}
</script>

<style>

</style>
