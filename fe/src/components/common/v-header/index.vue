<template>
    <el-row class='header'>
        <el-col :span='8' class='item1'>BBFE</el-col>
        <el-col :span='8' class='item2'>{{title}}</el-col>
        <el-col :span='8'>
            <el-dropdown trigger='click' class='item3' menu-align='start'>
                      <span class='el-dropdown-link'>
                        <span>tools</span><i class='el-icon-caret-bottom el-icon--right i'></i>
                      </span>
                <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item v-for='v,i in toolList' :key='v.text'><span
                            @click="tools(i)">{{v.text}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>
<style lang='less' scoped>
    .header {
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #fff;
        color: #20A0FF;
        font-size: 30px;
        .item1 {
            padding: 0 20px;
        }
        .item2 {
            font-size: 25px;
            text-align: center;
        }
        .item3 {
            font-size: 18px;
            color: #20A0FF;
            float: right;
            padding-right: 120px;
            .i {
                font-size: 14px;
            }
        }
    }
</style>
<script type='text/ecmascript-6'>
  export default {
    props: ['title'],
    data(){
      return {
        toolList: [
          {
            text: '重构项目数据'
          },
          {
            text: '重构参数数据'
          }
        ],
      }
    },
    methods: {
      tools(index){
        debugger
        switch (index) {
          case 0 :
            this.rePro()
            break
          case 1:
            this.reParams()
            break
        }
      },
      a(){alert(1)},
      rePro(){
        this.$http.get('base/rebuild').then(() => {
          window.location.reload(true)
        })
      },
      reParams(){
        this.$http.get('base/reset').then(() => {
          window.location.reload(true)
        })
      },
    }
  }
</script>