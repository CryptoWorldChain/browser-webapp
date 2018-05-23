import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('@/components/Home/Home')
const NotFound = ()=> import('@/components/NotFound');
const Blocks =() => import('@/components/Blocks/Blocks');
const Block =() => import('@/components/block/Block');
const Address =() => import('@/components/Address/Address');
const Accounts =() => import('@/components/Accounts/Accounts');
const Transaction =() => import('@/components/Transaction/Transaction');
const Transactioninfo =() => import('@/components/Transactioninfo/Transactioninfo');
const NodeList =() => import('@/components/NodeList/NodeList');
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'*',
      name:NotFound,
      component:NotFound
    },
    {
      path: '/blocks',
      name: 'Blocks',
      component: Blocks
    },
    {
      path:'/block',
      name:'Block',
      component:Block
    },
    {
      path:'/accounts',
      name:'Accounts',
      component:Accounts
    },
    {
      path:'/address/:address?',
      name:'Address',
      component:Address
    },
    {
      path:'/transaction',
      name:'Transaction',
      component:Transaction
    },
    {
      path:'/transactioninfo',
      name:'Transactioninfo',
      component:Transactioninfo
    },
    {
      path:'/nodelist',
      name:'NodeList',
      component:NodeList
    }
  ]
})
