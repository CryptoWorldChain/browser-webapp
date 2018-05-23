<template>
  <div class="">
    <div class="text-right nav-block">
      <div class="nav-block-inner wrapper">
        <router-link :to="{path:'/'}">home</router-link> / Accounts
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
  components:{
    Table
  },
  data () {
    return {
      columns:[
        {
          title:'Rank',
          key:'rank',
          className:'text-color'
        },
        {
          title:'Address',
          key:'address',
          className:'link',
          render: (h,params) => {
            return h('a',{
              on:{
                click:()=>{
                  this.address(params);
                }
              }
            },params.row.address)
          }
        },
        {
          title:'Balance',
          key:'balance',
          className:'text-color'
        },
        {
          title:'Txn',
          key:'txn',
          className:'text-color'
        }
      ],
      data:[]
    }
  },
  mounted () {
    console.log('mounted',this);
    this.data = [
      {rank:1,address:'0xfjdlsfjdlsfjdlsjfdlfjsd',balance:'23434.234','txn':234}
    ]
  },
  methods:{
    address ({row}) {
      this.$router.push({
        path:'/address/' + row.address
      })
    }
  }
}
</script>

<style>

</style>
