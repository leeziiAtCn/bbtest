<template>
    <el-row class='body'>
        <el-col :span='4' class="nav">
            <el-menu class='el-menu-vertical-demo' theme="dark" :unique-opened='true' @open="getApi">
                <el-submenu :index='i+""' v-for='v,i in list' :key='v.id'>
                    <template slot='title'>{{v.name}}</template>
                    <el-menu-item :index='i+"-"+index' v-for="val,index in v.item" :key="val.id">
                        {{val.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
  export default {
    data () {
      return {
        list: [],
        item: []
      }
    },
    methods: {
      async getSer () {
        let ser = (await this.$http.get('/api/ser')).data
        for (let val of ser) {
          val.item = (await this.getApi(val.id)).data
        }
        this.list = ser
      },
      getApi (id) {
        return this.$http.get('/api/interface', {
          params: {
            id: id
          }
        })
      }
    },
    created () {
      this.getSer()
    }
  }
</script>
<style lang='less' scoped>
    .body {
        min-height: calc(~"100% - " 80px);
        .nav {
            background: #37465B;
            min-height: 100%;
            li {
                overflow: hidden;
            }
        }
    }

</style>