<template>
    <div id="app">
        <el-row class='header'>
            <el-col :span='8' class='item1'>Test interface for BBlink-qs</el-col>
            <el-col :span='8' class='item2'>Product List</el-col>
            <el-col :span='8'>
                <el-dropdown trigger='click' class='item3' menu-align='start'>
                      <span class='el-dropdown-link'>
                        <span>tools</span><i class='el-icon-caret-bottom el-icon--right i'></i>
                      </span>
                    <el-dropdown-menu slot='dropdown'>
                        <el-dropdown-item v-for='v,i in toolList' :key='v.text'>{{v.text}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        toolList: [
          {
            text: '工具一'
          },
          {
            text: '工具二'
          },
          {
            text: '工具三'
          }
        ],
      }
    }
  }
</script>

<style lang='less'>
    #app {
        background: #F7F6F2;
    }

    .header {
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
