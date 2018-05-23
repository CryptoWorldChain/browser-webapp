<template>
  <div id="app" class="browser">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/Header';
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style lang="less">
@import './css/index.less';
@import './css/common.css';
@import './css/message.less';
#app {
  font-family:Helvetica, Arial, sans-serif,'microsoft yahei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>