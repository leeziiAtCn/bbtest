<template>
  <el-row :style="styles"
    :class="className">
    <el-table :data="params"
      border
      style="width: 100%">
      <el-table-column label="key">
        <template scope="scope">
          <el-input v-model="scope.row.key"
            placeholder="请输入key值"
            class="input"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="value">
        <template scope="scope">
          <el-input v-model="scope.row.default"
            placeholder="请输入value值"
            class="input"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="参数类型">
        <template scope="scope">
          <el-select v-model="scope.row.what"
            placeholder="请选择请求数据类型">
            <el-option v-for="item in types"
              :key="item.key"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="type"
        label="参数位置">
      </el-table-column>
      <el-table-column prop="required"
        label="是否必传">
      </el-table-column>
      <el-table-column prop="description"
        label="描述">
      </el-table-column>
    </el-table>
    <el-col :span="10"
      :offset='14'
      class="operation">
      <el-button @click="saveAll">保存</el-button>
      <el-button type="danger"
        @click="serAsync(1)">发射</el-button>
      <el-button type="danger"
        @click="serAsync(100)">并发100次</el-button>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
  .operation {
    line-height: 100px;
  }
</style>

<script>
  import mixin from '../mixins'

  export default {
    mixins: [mixin],
    props: {
      params: {
        type: Array
      }
    },
    data () {
      return {
        types: [
          {
            label: '未定义',
            value: 0,
            key: 0
          },
          {
            label: '数字',
            value: 1,
            key: 1
          },
          {
            label: '字符串',
            value: 2,
            key: 2
          }
        ]
      }
    },
    methods: {
      save (val) {
        return this.$http.get('/api/saveParam', {
          params: {
            pid: val.pid, key: val.key, default: val.default, what: val.what
          }
        })
      },
      saveAll () {
        Promise.all(this.params.filter(val => val.key.toUpperCase() !== 'CONTENT-TYPE').map(val => {
          return this.save(val)
        })).then(() => {
          this.$notify({
            title: '成功',
            message: '已经保存到对应的参数',
            type: 'success'
          })
        })
      },
      serAsync (count) {
        this.$emit('fires', { apiId: this.params[0].id, count })
      }
    },
    watch: {
      params: function (val, oldVal) {
        val = filterGet(val)
      }
    }
  }
  function requiredMap (type) {
    switch (type) {
      case 1:
        return '是'
      case 0:
        return '否'
      case null:
        return '未知'
    }
  }
  function paramsLocation (type) {
    if (typeof type === 'number') {
      switch (type) {
        case 0:
          return 'header'
        case 1:
          return 'body'
        case 2:
          return 'url'
      }
    }
  }
  function filterGet (data) {
    return data.map(v => {
      v.required = requiredMap(v.required)
      v.type = paramsLocation(v.type)
      return v
    })
  }
</script>
