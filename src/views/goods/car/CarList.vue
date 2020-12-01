<template>
  <div class="app-container">
    <el-row
      style="padding-bottom: 15px"
      type="flex"
      align="middle"
      justify="space-between"
    >
      <el-col :span="3">
        <b>车辆列表</b>
      </el-col>
      <el-col :span="3" :push="1" :offset="1"> 车辆名称: </el-col>
      <el-col :span="2" :pull="1">
        <el-input placeholder="请输入" v-model="carName" clearable size="small">
        </el-input>
      </el-col>
      <el-col :span="2" :pull="1"> 车辆ID: </el-col>
      <el-col :span="2" :pull="2">
        <el-input placeholder="请输入" v-model="carId" clearable size="small">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="clearInput">重置</el-button>
        <el-button type="primary" @click="conditionSearch">搜索</el-button
        ><el-button type="success" @click="addCar">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eee', color: '#333' }"
    >
      <el-table-column type="index" label="序号" align="center" width="50px">
      </el-table-column>
      <el-table-column prop="producttype" label="车辆ID" align="center">
      </el-table-column>
      <el-table-column prop="alteredcolumn" label="车辆名称" align="center">
      </el-table-column>
      <el-table-column prop="altertype" label="车辆信息" align="center">
      </el-table-column>
      <el-table-column prop="alteredreason" label="保养周期(月)" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="handleUpdate(scope.$index, scope.row)"
          >
            编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除</el-button
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

    <el-dialog
      :title="opreation ? '编辑车辆' : '新增车辆'"
      :visible="dialogVisible"
      :show-close="false"
      width="30%"
    >
      <el-form :model="car" ref="car" label-width="150px">
        <el-form-item label="车辆ID：" :hidden="!opreation">
          <el-input class="input-width" v-model="car.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="车辆名称：">
          <el-input class="input-width" v-model="car.name"></el-input>
        </el-form-item>
        <el-form-item label="车辆信息：">
          <el-input class="input-width" v-model="car.infor"></el-input>
        </el-form-item>
        <el-form-item label="保养周期(月)：">
          <el-input class="input-width" v-model="car.cycle"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelOperation">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { findSearch, exportByPage, exportByAll } from './alteredCheck'

export default {
  data() {
    return {
      // false为新增，true为编辑
      opreation: false,

      car: {
        "id": 1,
        "name": "测试",
        "infor": "信息",
        "cycle": "34天"
      },

      dialogVisible: false,

      startTime: "",
      endTime: "",

      column: "",
      carId: "",
      carName: "",

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
    // 创建查询参数
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
    // 重置搜索框
    clearInput() {
      this.carName = ''
      this.carId = ''
    },
    // 编辑按钮
    handleUpdate(index, row) {
      this.dialogVisible = true
      this.opreation = true
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 网络请求删除
        this.$message({
          message: '删除成功！',
          type: 'success',
          duration: 1000
        })
      }).catch(() => {
        row.purchase = false
        this.$message({
          message: '操作取消！',
          type: 'info',
          duration: 1000
        })
      })
    },
    // 新增按钮
    addCar() {
      this.dialogVisible = true
      this.opreation = false
      this.car = {}
    },
    // 取消新增或者编辑
    cancelOperation() {
      this.dialogVisible = false

      this.$message({
        message: '操作取消！',
        type: 'info',
        duration: 1000
      })
    },
    // 新增或者编辑完成
    handleConfirm() {
      // 网络请求修改或者新增数据（save方法）

      this.dialogVisible = false

      this.$message({
        message: this.opreation ? '修改成功！' : '添加成功',
        type: 'success',
        duration: 1000
      })
    }
  },
  created() {
    this.conditionSearch()
  },
};
</script>
<style scoped>
.input-width {
  width: 80%;
}
</style>