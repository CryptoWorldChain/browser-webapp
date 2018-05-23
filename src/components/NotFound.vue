<template>
  <div class="not-found">
    <div class="not-found-wrapper"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .not-found {
    position: relative;
    background-color: #fff;
    z-index: 999;
    margin-top: 50px;
    .not-found-wrapper {
      height: 500px;
      background: url(/static/img/not-found.jpg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 50%;
    }
  }
</style>
