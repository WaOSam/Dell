<template>
  <div class="app-container">
    <el-row
      style="padding-bottom: 15px"
      type="flex"
      align="middle"
      justify="space-between"
    >
      <el-col :span="3">
        <b>维修列表</b>
      </el-col>
      <el-col :span="3" :push="4" :offset="1"> 维修订单号: </el-col>
      <el-col :span="2">
        <el-input placeholder="请输入" v-model="carId" clearable size="small">
        </el-input>
      </el-col>
      <el-col :span="6" :push="1">
        <el-button @click="clearInput">重置</el-button>
        <el-button type="primary" @click="conditionSearch">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eee', color: '#333' }"
    >
      <el-table-column type="index" label="序号" align="center" width="50px">
      </el-table-column>
      <el-table-column prop="nation" label="维修订单编号" align="center">
      </el-table-column>
      <el-table-column prop="producttype" label="车辆ID" align="center">
      </el-table-column>
      <el-table-column prop="alteredcolumn" label="问题描述" align="center">
      </el-table-column>
      <el-table-column prop="altertype" label="维修申请时间" align="center">
      </el-table-column>
      <el-table-column prop="alteredreason" label="当前状态" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-s-order"
            @click="handleUpdate(scope.$index, scope.row)"
          >
            查看维修计划</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20]"
      :page-size="pagesize"
      :total="total"
      style="margin-top: 20px; text-align: right"
      background
      layout="total, prev, pager, next, sizes, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
// import { findSearch, exportByPage, exportByAll } from './alteredCheck'

export default {
  data() {
    return {
      startTime: "",
      endTime: "",

      column: "",
      carId: "",
      carId: "",

      tableData: [{
        "nation": "json在线编辑器",
        "producttype": "删除",
        "alteredcolumn": "测试类型",
        "altertype": "空掉",
        "alteredreason": "玩玩而已",
        "alteredcontent": "增加java类生成"
      }],
      total: 0,

      pagesize: 8,
      currentPage: 1,

      searchMap: "",
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val
      this.conditionSearch()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.createSearch()
      this.search()
    },

    conditionSearch() {
      this.createSearch()
      this.currentPage = 1
      this.searchMap.currentPage = 1
      this.search()
    },

    createSearch() {
      this.searchMap = {
        alterType: this.type,
        alteredColumn: this.column,
        responsor: this.responsor,
        startTime: this.startTime,
        endTime: this.endTime,
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      }
    },
    search() {
      findSearch(this.searchMap).then((res) => {
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    },
    clearInput() {
      this.carId = ''
      this.carId = ''
    },
  },
  created() {
    this.conditionSearch()
  },
};
</script>
<style scoped>
</style>