<template>
    <div>
        <v-header title='Product List'></v-header>
        <el-row class="body">
            <el-col :span="6" class='pro' v-for='v,i in proList' :key='v.text'>
                <div class="pro-i" @click="turnItem(v)">
                    <el-row class='title'>
                        <el-col :span="24">{{v.name}}</el-col>
                    </el-row>
                    <el-row class='info'>
                        <el-col :span="24">参与人数：{{v.userCount}} 接口总数：{{v.interfaceCount}}</el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script type='text/ecmascript-6'>
  import vHeader from 'components/common/v-header'
  export default {
    data () {
      return {
        proList: [
          {
            createTime: '',
            id: '',
            interfaceCount: 0,
            name: '',
            status: 0,
            updateTime: 0,
            userCount: 0
          }
        ]
      }
    },
    methods: {
      async getPro () {
        this.proList = (await this.$http.get('/api/pro')).data
      },
      turnItem (item) {
        this.$router.push(`/interface?id=${item.id}`)
      }
    },
    created () {
      this.getPro()
    },
    components: {
      vHeader
    }
  }
</script>
<style lang='less' scoped>
    .body {
        margin-top: 20px;
        .pro {
            height: 190px;
            padding: 20px;
            .pro-i {
                background: url("./img/back1.jpg") no-repeat center;
                width: 100%;
                height: 100%;
                border-radius: 10px;
                box-shadow: 2px 2px 2px #888888;
                transition: all .2s;
                position: relative;
                cursor: pointer;
                &:hover {
                    transform: translateY(30px);
                }
            }
        }
        .title {
            height: 120px;
            line-height: 120px;
            text-align: center;
            font-size: 25px;
            color: grey;
        }
        .info {
            height: 30px;
            line-height: 30px;
            text-indent: 2em;
            background-color: rgba(215, 215, 215, 0.51);
            border-radius: 0 0 10px 10px;
            color: grey;
        }
    }
</style>
