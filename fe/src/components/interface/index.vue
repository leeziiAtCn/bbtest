<template>
  <el-row class='body'>
    <v-header title='Interface List'></v-header>
    <el-col :span='4'
      class="nav">
      <el-menu class='el-menu-vertical-demo'
        :unique-opened='true'
        @open="isOpen">
        <el-submenu :index='i+""'
          v-for='(v,i) in list'
          :key='v.id'>
          <template slot='title'>{{v.name}}</template>
          <el-menu-item :index='i+"-"+index'
            v-for="(val,index) in v.item"
            :key="val.id"
            @click="chooseItem(val)">
            {{val.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20"
      class='board'>
      <v-module :module="module"></v-module>
      <v-interface :interfaceObj="interfaceObj"
        v-show="interfaceObj.name"></v-interface>

    </el-col>
  </el-row>
</template>
<script>
  import vHeader from 'components/common/v-header'
  import vModule from 'components/common/v-module'
  import vInterface from 'components/common/v-interface'
  export default {
    data () {
      return {
        list: [],
        module: {
          name: '',
          status: 0,
          item: []
        },
        interfaceObj: {},
        mode: '',
        modes: [{
          label: 'JSON格式',
          value: 'application/json; charset=utf-8',
          key: 0
        },
        {
          label: 'form表单',
          value: 'application/x-www-form-urlencoded;charset=utf-8',
          key: 1
        },
        {
          label: '未定义',
          value: '',
          key: 2
        }
        ],
        types: [{
          label: '字符串',
          value: 'String',
          key: 0
        },
        {
          label: '数字',
          value: 'Number',
          key: 1
        }
        ]
      }
    },
    methods: {
      async getSer () {
        let { data } = await this.$http.get('/api/ser', {
          params: {
            id: this.$route.query.id
          }
        })
        try {
          this.getItem(data.data)
          this.$message.success({
            message: '加载成功'
          })
        } catch (err) {
          this.$message.error({
            message: '加载失败'
          })
        }
      },
      async  getItem (list) {
        for (let val of list) {
          let { data } = await this.$http.get('/api/interface', {
            params: {
              id: val.id
            }
          })
          val.item = data
        }
        this.list = list
      },
      isOpen (index) {
        this.module = this.list[index]
        this.interfaceObj = {}
      },
      chooseItem (val) {
        this.interfaceObj = val
      }
    },
    created () {
      this.getSer()
    },
    computed: {
      len: function () {
        return this.$store.state.result.length
      }
    },
    components: {
      vHeader,
      vModule,
      vInterface
    }
  }

  function makeUrl (api, p) {
    let url = api.url
    let params = p.filter(val => val.type === 'rest')
    params.map(val => {
      url = url.replace('{' + val.key + '}', val.default)
    })
    return url
  }

  function makeheader (p) {
    let params = p.filter(val => val.type === 'header')
    let o = {}
    params.map(val => {
      o[val.key] = val.default
    })
    return o
  }

  function makeBody (p) {
    let params = p.filter(val => val.type === 'body')
    let o = {}
    params.map(val => {
      switch (val.what) {
        case 'String':
          val.default = '' + val.default
          break
        case 'Number':
          val.default = +val.default
          break
        default:
          val.default = '' + val.default
      }
      o[val.key] = val.default
    })
    return o
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
      margin-top: 60px;
      left: 17%;
      padding-bottom: 60px;
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
  
  .res {
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    background: #fff;
    .title {
      height: 100px;
      line-height: 100px;
      font-size: 20px;
    }
    .result {
      line-height: 80px;
      min-height: 80px;
    }
  }
</style>
<style>
  td {
    padding: 20px 0 !important;
  }
</style>