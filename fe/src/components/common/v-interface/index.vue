<template>
  <el-row :style="styles"
    :class="className"
    class="bg">
    <el-col :span="22"
      class="title"
      :offset="1">
      <span class="name">{{interfaceObj.name}}</span>
      <span class="status">状态：{{interfaceObj.status === 0 ? '正常' : '异常'}}</span>
      <span class="status">请求方式：{{interfaceObj.method}}</span>
      <span class="status">url：{{interfaceObj.url}}</span>
      <span class="status"
        v-if="interfaceObj.method === 'POST'">
        <el-select v-model="interfaceObj.content_type"
          placeholder="请选择POST请求数类型">
          <el-option v-for="item in modes"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="danger"
          @click="saveContent">保存</el-button>
      </span>
    </el-col>
    <el-col :span="22"
      :offset="1">
      <v-params @fires="fires"
        :params="params"
        v-show="params.length"></v-params>
    </el-col>
    <el-col :span="22"
      :offset="1">
      <v-result :result="result"
        v-show="result.status"></v-result>
    </el-col>
  </el-row>
</template>
<script type='text/ecmascript-6'>
  import mixin from '../mixins'
  import vParams from 'components/common/v-params'
  import vResult from 'components/common/v-result'
  export default {
    mixins: [mixin],
    props: {
      interfaceObj: {
        type: Object
      }
    },
    data () {
      return {
        params: [],
        modes: [
          {
            label: 'JSON格式',
            key: 'application/json; charset=utf-8',
            value: 1
          },
          {
            label: 'form表单',
            key: 'application/x-www-form-urlencoded;charset=utf-8',
            value: 2
          },
          {
            label: '未定义POST数据类型',
            value: 0,
            key: ''
          }
        ],
        result: {
          data: [{ req: {}, header: {}, text: {} }],
          status: 0
        }
      }
    },
    methods: {
      async getParamsBy2id ({ id, did }) {
        this.$http.get('/api/params')
      },
      async saveContent () {
        let { data } = await this.$http.get('/api/changeContentType', {
          params: {
            id: this.interfaceObj.id,
            content_type: this.interfaceObj.content_type
          }
        })
        if (data.code === 200) {
          this.$notify({
            title: '成功',
            message: '已经保存到对应的接口',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '成功',
            message: data.msg,
            type: 'success'
          })
        }
      },
      async fires (params) {
        this.result = await this.$http.get('/test/fire', { params })
      }
    },
    components: {
      vParams,
      vResult
    },
    watch: {
      interfaceObj: function (val, oldVal) {
        this.$http.get('/api/params', {
          params: {
            id: val.id,
            did: val.did
          }
        }).then(({ data }) => {
          if (data.code === 200) {
            this.params = data.data
            this.$message.success({
              message: '加载成功'
            })
          } else {
            this.$message.error({
              message: '加载失败'
            })
          }
        })
      }
    }
  }
</script>
<style scoped lang='less'>
  .bg {
    background: #fff;
    width: 95%;
    margin: 20px auto;
    border-radius: 10px;
  }
  
  .title {
    height: 100px;
    line-height: 100px;
    .name {
      font-size: 26px;
      margin: 0;
    }
    span {
      font-size: 14px;
      margin-left: 20px;
    }
  }
  
  .input {
    width: 80%;
  }
</style>