// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var accounting = require("accounting");
import moment from 'moment'
import timeago from 'timeago.js';
import {locale} from 'iview';
import './my-theme/index.less';
import './css/table.less';
import {LoadingBar} from "iview";
import { Message } from "./components/message/message";
import { Spinner } from './components/message/spin';
import lang from 'iview/dist/locale/en-US';

locale(lang)
Vue.component('LoadingBar',LoadingBar);

var spinner = (function () {
  var target = document.body;
  var opts = {
    color: '#fff',
    lines:10,
    width:4
  }
  var spinner = new Spinner(opts);
  var spin = {
    start: function () {
      spinner.spin(target);
    },
    stop:function () {
      spinner.stop();
    }
  }
  return spin;
})();
Vue.config.productionTip = false

Vue.prototype.accounting = accounting;
Vue.prototype.moment = moment;
Vue.prototype.timeago = timeago;
Vue.prototype.message = Message;
Vue.prototype.spinner = spinner;
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next();
});

router.afterEach(route => {
  LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// var Mock = require('mockjs')
// var data = Mock.mock('/good',{
//     'list|8-10': [{
//         'id|+1': 1,
//         'email':'@email',
//         'date':'@date',
//         'like|1':'@boolean',
//         'first':'@first',
//         'county':'@county(true)',
//         'name':'@cname'
//     }]
// })
// axios.get('/good').then((res)=>{
//   console.log('mockjs------------',res.data.list)
// })