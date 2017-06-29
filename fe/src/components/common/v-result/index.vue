<template>
  <el-row :style="styles"
    :class="className"
    class="result">
    <el-col :span="24"
      class="title">响应数据</el-col>
    <el-col :span="24">
      <el-col :span="4">request status:</el-col>
      <el-col :span="4">{{res.status===200?'ok':'faild'}}</el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="4">request times:</el-col>
      <el-col :span="4">{{result.data.length}}</el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="4">request url:</el-col>
      <el-col :span="4">{{res.req.url}}</el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="4">request method:</el-col>
      <el-col :span="4">{{res.req.method}}</el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="4">requset headers:</el-col>
      <el-col :span="20">
        <el-col :span="24"
          v-for="(val,key) in res.req.headers"
          :key="key">
          <el-col :span="4">{{key}}</el-col>
          <el-col :span="12">{{val}}</el-col>
        </el-col>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="4">requset body:</el-col>
      <el-col :span="20">
        <el-col :span="24"
          v-for="(val,key) in res.req.data"
          :key="key">
          <el-col :span="4">{{key}}</el-col>
          <el-col :span="12">{{val}}</el-col>
        </el-col>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="4">response</el-col>
      <el-col :span="20">
        {{res.text}}
      </el-col>
    </el-col>
    </el-col>
  </el-row>
</template>
<script>
  import mixin from '../mixins'
  export default {
    mixins: [mixin],
    props: {
      result: {
        type: Object
      }
    },
    data () { return {} },
    computed: {
      res: function () {
        return this.result.data[0]
      }
    }
  }
</script>
<style lang="less">
  .title {
    font-size: 22px;
    height: 60px;
    line-height: 60px;
  }
  
  .result {
    >div {
      min-height: 80px;
      line-height: 80px;
      word-wrap: break-word;
    }
  }
</style>


