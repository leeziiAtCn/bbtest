<template>
  <el-row class='body'>
    <v-header title='Interface List'></v-header>
    <el-col :span='4' class="nav">
      <el-menu class='el-menu-vertical-demo' :unique-opened='true' @open="changeInfo">
        <el-submenu :index='i+""' v-for='(v,i) in list' :key='v.id'>
          <template slot='title'>{{v.name}}</template>
          <el-menu-item :index='i+"-"+index' v-for="(val,index) in v.item" :key="val.id" @click='show(val)'>
            {{val.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" class='board'>
      <v-info :info='info'></v-info>
      <el-row class="interface" v-if='showItem.name'>
        <el-col :span="22" class="title" :offset="1">
          <span class="name">{{showItem.name}}</span>
          <span class="status">状态：{{showItem.status === 0 ? '正常' : '异常'}}</span>
          <span class="status">请求方式：{{showItem.method}}</span>
          <span class="status">url：{{showItem.url}}</span>
          <span class="status" v-if="showItem.method === 'POST'">
            <el-select v-model="mode" placeholder="请选择POST请求数类型">
              <el-option v-for="item in modes" :key="item.key" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
  
        </el-col>
        <el-col :span="22" :offset="1">
          <el-table :data="description" border style="width: 100%">
            <el-table-column label="key">
              <template scope="scope">
                <el-input v-model="scope.row.key" placeholder="请输入key值" class="input"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="value">
              <template scope="scope">
                <el-input v-model="scope.row.default" placeholder="请输入value值" class="input"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="参数类型">
              <template scope="scope">
                <el-select v-model="scope.row.what" placeholder="请选择请求数据类型">
                  <el-option v-for="item in types" :key="item.key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="参数位置">
            </el-table-column>
            <el-table-column prop="required" label="是否必传">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
          </el-table>
          <el-col :span="10" :offset='14' class="operation">
            <el-button @click="saveAll">保存</el-button>
            <el-button type="danger" @click="post()">发射</el-button>
            <el-button type="danger" @click="serAsync()">并发100次</el-button>
            <el-button type="danger" @click="serSync()">继发100次</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="res" v-if="result.code">
        <el-col :span="22" :offset="1" class="title">测试结果</el-col>
        <el-col :span="22" :offset="1" class="result">响应状态：{{result.code}}</el-col>
        <el-col :span="22" :offset="1" class="result">响应报文：{{result.data}}</el-col>
        <el-col :span="22" :offset="1" class="result">响应消息：{{result.msg}}</el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import vHeader from 'components/common/v-header'
import vInfo from 'components/common/v-info'
import qs from 'qs'
export default {
  data() {
    return {
      list: [],
      item: [],
      showItem: {},
      info: {
        name: '',
        item: []
      },
      description: [],
      fullscreenLoading: false,
      result: {
        code: '',
        msg: '',
        data: ''
      },
      mode: '',
      modes: [
        {
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
      types: [
        {
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
    async getSer() {
      let ser = (await this.$http.get('/api/ser', {
        params: {
          id: this.$route.query.id
        }
      })).data
      for (let val of ser) {
        val.item = (await this.getApi(val.id)).data
      }
      this.list = ser
    },
    getApi(id) {
      return this.$http.get('/api/interface', {
        params: {
          id: id
        }
      })
    },
    show(item) {
      this.showItem = item
      this.getParams(item)
    },
    changeInfo(index) {
      this.info = this.list[index]
      this.showItem = {}
    },
    getParams(item) {
      this.$http.get('/api/params', {
        params: {
          id: item.id,
          did: item.did
        }
      }).then(res => {
        this.description = res.data.sort((a, b) => {
          return a.type - b.type
        })
        this.description.map(val => {
          switch (val.type) {
            case 1:
              val.type = 'body'
              break
            case 0:
              val.type = 'header'
              break
            case 2:
              val.type = 'rest'
          }
          switch (val.required) {
            case 1:
              val.required = '是'
              break
            case 0:
              val.required = '否'
              break
            case null:
              val.required = '未知'
          }
          switch (val.what) {
            case null:
              val.what = ''
              break
            case 'String':
              val.what = '字符串'
              break
            case 'Number':
              val.what = '数字'
              break
            default:
              val.what = '错误'
          }
        })
      })
    },
    save(pid, key, defaultValue) {
      return this.$http.get('/api/saveParam', {
        params: {
          pid,
          key,
          defaultValue
        }
      })
    },
    saveAll() {
      let p = this.description.map(val => {
        return this.save(val.pid, val.key, val.default, val.what)
      })
      // p.push(
      //   this.$http.get('/api/changeContentType',{
      //     params:{
      //       id:
      //     }
      //   })
      // )
      Promise.all(p).then(res => {
        this.$notify({
          title: '成功',
          message: '已经保存到对应的接口',
          type: 'success'
        })
      })
    },
    post() {
      let url = this.info.baseUrl + makeUrl(this.showItem, this.description)
      switch (this.showItem.method.toLowerCase()) {
        case 'post':
          this.methodPost(url)
          break
        case 'get':
          this.methodGet(url)
          break
      }
    },
    methodPost(url) {
      let header = makeheader(this.description)
      let body = makeBody(this.description)
      if (!header['Content-Type'] || header['Content-Type'] === '') {
        header['Content-Type'] = 'application/x-www-form-urlencoded'
        body = qs.stringify(body)

      } else {
        header['Content-Type'] = 'application/json; charset=utf-8'
      }
      this.$http.post(url, body, {
        headers: header
      }).then(res => {
        this.result = res.data
      })
    },
    methodGet(url) {
      let header = makeheader(this.description)
      let body = makeBody(this.description)
      this.$http.get(url, {
        headers: header,
        params: body
      }).then(res => {
        this.result = res.data
      }).catch(ret => {
        this.result = {
          code: '0',
          msg: '挂了',
          data: ret.toString()
        }
      })
    },
    serAsync() {
      let url = this.info.baseUrl + makeUrl(this.showItem, this.description)
      let header = makeheader(this.description)
      let body = makeBody(this.description)
      body.method = this.showItem.method
      console.log(body)
      this.$http.post('/test/async', {
        url,
        header,
        body
      }, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(res => {

        })
    },
    serSync() {

    }
  },
  created() {
    this.getSer()
  },
  components: {
    vHeader,
    vInfo
  }
}

function makeUrl(api, p) {
  let url = api.url
  let params = p.filter(val => val.type === 'rest')
  params.map(val => {
    url = url.replace('{' + val.key + '}', val.default)
  })
  return url
}

function makeheader(p) {
  let params = p.filter(val => val.type === 'header')
  let o = {}
  params.map(val => {
    o[val.key] = val.default
  })
  return o
}

function makeBody(p) {
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