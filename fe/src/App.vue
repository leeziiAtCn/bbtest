<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
  }
</script>

<style lang='less'>
    #app {
        background: #F7F6F2;
    }

    .header {
        height: 60px;
        line-height: 60px;
        background: #fff;
        color: #20A0FF;
        font-size: 30px;
        .item1 {
            padding: 0 20px;
        }
        .item2 {
            font-size: 25px;
            text-align: center;
        }
        .item3 {
            font-size: 18px;
            color: #20A0FF;
            float: right;
            padding-right: 120px;
            .i {
                font-size: 14px;
            }
        }
    }
</style>
