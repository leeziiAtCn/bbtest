<template>
    <el-row class='body'>
        <v-header title='Interface List'></v-header>
        <el-col :span='4' class="nav">
            <el-menu class='el-menu-vertical-demo' :unique-opened='true' @open="changeInfo">
                <el-submenu :index='i+""' v-for='v,i in list' :key='v.id'>
                    <template slot='title'>{{v.name}}</template>
                    <el-menu-item :index='i+"-"+index' v-for="val,index in v.item" :key="val.id" @click='show(val)'>
                        {{val.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="20" class='board'>
            <v-info :info='info'></v-info>
            <el-row class="interface" v-if='showItem.name'>
                <el-col :span="24">
                    <el-col :span="22" class="title" :offset="1">
                        <span class="name">{{showItem.name}}</span>
                        <span class="status">状态：{{showItem.status === 0 ? '正常' : '异常'}}</span>
                        <span class="status">请求方式：{{showItem.method}}</span>
                        <span class="status">url：{{showItem.url}}</span>
                    </el-col>
                    <el-col :span="22" :offset="1">
                        <el-table
                                :data="description"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="key">
                                <template scope="scope">
                                    <el-input v-model="scope.row.key" placeholder="请输入key值" class="input"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="value">
                                <template scope="scope">
                                    <el-input v-model="scope.row.default" placeholder="请输入value值"
                                              class="input"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="isheader"
                                    label="参数位置">
                            </el-table-column>
                            <el-table-column
                                    prop="required"
                                    label="是否必传">
                            </el-table-column>
                            <el-table-column
                                    prop="description"
                                    label="描述">
                            </el-table-column>
                        </el-table>
                        <el-col :span="6" :offset='18' class="operation">
                            <el-button>保存</el-button>
                            <el-button type="danger">发射</el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
  import vHeader from 'components/common/v-header'
  import vInfo from 'components/common/v-info'

  export default {
    data () {
      return {
        list: [],
        item: [],
        showItem: {},
        info: {
          name: '',
          item: []
        },
        description: []
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
        this.getParams(item)
      },
      changeInfo (index) {
        this.info = this.list[index]
      },
      getParams(item){
        this.$http.get('/api/params', {
          params: {
            id: item.id,
            did: item.did
          }
        }).then(res => {
          this.description = res.data.sort((a, b) => {
            return a.isheader - b.isheader
          })
          this.description.map(val => {
            val.isheader = val.isheader === 0 ? 'header' : 'body'
            switch (val.required) {
              case 1 :
                val.required = '是'
                break
              case 0 :
                val.required = '否'
                break
              case null :
                val.required = '未知'
            }
          })
        })
      }
    },
    created () {
      this.getSer()
    },
    components: {
      vHeader,
      vInfo
    }
  }
</script>
<style lang='less' scoped>
    .body {
        min-height: 100%;
        .nav {
            background: #37465B;
            min-height: 100%;
            margin-top: 60px;
            li {
                overflow: hidden;
            }
        }
        .board {
            position: fixed;
            margin-top: 60px;
            left: 17%;
        }
    }

    .interface {
        background: #fff;
        width: 95%;
        margin: 20px auto;
        border-radius: 10px;
        padding-bottom: 30px;
    }

    .title {
        height: 60px;
        line-height: 60px;
        .name {
            font-size: 20px;
            margin: 0;
        }
        span {
            font-size: 14px;
            margin-left: 20px;
        }
    }

    .input {
        width: 150px;
    }

    .operation {
        height: 80px;
        line-height: 80px;
    }
</style>