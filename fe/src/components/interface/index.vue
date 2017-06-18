<template>
    <el-row class='body'>
        <v-header title='Interface List'></v-header>
        <el-col :span='4' class="nav">
            <el-menu class='el-menu-vertical-demo' :unique-opened='true' @open="getApi">
                <el-submenu :index='i+""' v-for='v,i in list' :key='v.id'>
                    <template slot='title'>{{v.name}}</template>
                    <el-menu-item :index='i+"-"+index' v-for="val,index in v.item" :key="val.id" @click='show(val)'>
                        {{val.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="20">
            {{showItem}}
        </el-col>
    </el-row>
</template>
<script>
  import vHeader from 'components/common/v-header'

  export default {
    data () {
      return {
        list: [],
        item: [],
        showItem: {}
      }
    },
    methods: {
      async getSer () {
        let ser = (await this.$http.get('/api/ser', {params: {id: this.$route.query.id}})).data
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
      },
      show (item) {
        this.showItem = item
      }
    },
    created () {
      this.getSer()
    },
    components: {
      vHeader
    }
  }
</script>
<style lang='less' scoped>
    .body {
        min-height: 100%;
        .nav {
            background: #37465B;
            min-height: 100%;
            li {
                overflow: hidden;
            }
        }
    }

</style>