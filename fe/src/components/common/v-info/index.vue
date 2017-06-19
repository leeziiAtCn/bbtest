<template>
    <el-row :style="styles" :class="className" class="bg" v-if='info.item.length'>
        <el-col :span='24'>
            <el-col :span="22" class="title" :offset="1">
                <span class="name">{{info.name}}</span>
                <span class="status">状态：{{info.status === 0 ? '正常' : '异常'}}</span>
                <span class="count">接口数量：{{info.item.length}}</span>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-input v-model="info.baseUrl" placeholder="请输入baseUrl" class="input"></el-input>
            </el-col>
            <el-col :span="10" :offset="7">
                <el-button type="primary">保存</el-button>
                <el-button type="primary">测试模块内所有接口</el-button>
            </el-col>
        </el-col>
    </el-row>
</template>
<script type='text/ecmascript-6'>
  import mixin from '../mixins';

  export default {
    mixins: [mixin],
    props: {
      info: {
        type: Object,
        default: {
          name: '',
          status: 0,
          item: []
        }
      }
    },
    data(){
      return {}
    },
    created(){
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