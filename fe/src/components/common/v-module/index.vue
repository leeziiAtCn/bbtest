<template>
  <el-row :style="styles" :class="className" class="bg">
    <el-col :span="22" class="title" :offset="1">
      <span class="name">{{module.name}}</span>
      <span class="status">状态：{{module.status === 0 ? '正常' : '异常'}}</span>
      <span class="count">接口数量：{{module.item.length}}</span>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-input v-model="module.baseUrl" placeholder="请输入baseUrl" class="input"></el-input>
    </el-col>
    <el-col :span="10" :offset="7">
      <el-button type="primary" @click="save">保存</el-button>
      <!--<el-button type="primary">测试模块内所有接口</el-button>-->
    </el-col>
  </el-row>
</template>
<script type='text/ecmascript-6'>
import mixin from '../mixins'

export default {
  mixins: [mixin],
  props: {
    module: {
      type: Object,
      default: {
        name: '',
        status: 0,
        item: []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    async save() {
      if (this.module.id && !this.module.baseUrl) {
        this.$message({
          showClose: true,
          message: '请填写BaseUrl',
          type: 'error'
        })
        return
      }
      let { data } = await this.$http.get('/api/changeBaseUrl', {
        params: {
          id: this.module.id,
          baseUrl: this.module.baseUrl
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
          title: '失败',
          message: data.msg,
          type: 'error'
        })
      }
    }
  },
  created() {
  }
}
</script>
<style scoped lang='less'>
.bg {
  background: #fff;
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  padding-bottom: 30px;
}

.title {
  height: 100px;
  line-height: 100px;
  .name {
    font-size: 30px;
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