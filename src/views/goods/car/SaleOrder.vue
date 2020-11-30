<template>
  <div class="app-container">
    <el-row
      style="padding-bottom: 15px"
      type="flex"
      align="middle"
      justify="space-between"
    >
      <el-col :span="3">
        <b>车辆销售订单</b>
      </el-col>
      <el-col :span="3" :push="1" :offset="2"> 买家ID: </el-col>
      <el-col :span="2" :pull="1">
        <el-input placeholder="请输入" v-model="salerId" clearable size="small">
        </el-input>
      </el-col>
      <el-col :span="2" :pull="1"> 车辆ID: </el-col>
      <el-col :span="2" :pull="2">
        <el-input placeholder="请输入" v-model="orderId" clearable size="small">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="clearInput">重置</el-button>
        <el-button type="primary" @click="conditionSearch">搜索</el-button
        ><el-button type="success" @click="addOrder">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eee', color: '#333' }"
    >
      <el-table-column type="index" label="序号" align="center" width="50px">
      </el-table-column>
      <el-table-column prop="producttype" label="销售单编号" align="center">
      </el-table-column>
      <el-table-column prop="altertype" label="车辆ID" align="center">
      </el-table-column>
      <el-table-column prop="alteredcolumn" label="车辆名称" align="center">
      </el-table-column>
      <el-table-column prop="alteredreason" label="买家ID" align="center">
      </el-table-column>
      <el-table-column prop="alteredcontent" label="购买时间" align="center">
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
      title="新增订单"
      :visible="dialogVisible"
      :show-close="false"
      width="30%"
    >
      <el-form :model="order" ref="order" label-width="150px">
        <el-form-item label="销售单编号：" hidden>
          <el-input class="input-width" v-model="order.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="车辆ID：">
          <el-select
            v-model="order.carID"
            clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in cars"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆名称：">
          <el-input
            class="input-width"
            v-model="order.carName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="买家ID：">
          <el-select
            v-model="order.saleID"
            clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in sales"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <el-input class="input-width" v-model="order.saleID"></el-input> -->
        </el-form-item>
        <el-form-item label="购买时间：">
          <el-date-picker
            v-model="order.bugTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
          >
          </el-date-picker>
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
      order: {
        "id": 1,
        "carName": "测试",
        "carID": "信息",
        "saleID": "34天",
        "bugTime": "2020-09-29 14:34:00"
      },

      cars: ["奔驰", "宝马", "法拉利"],
      sales: ["a", "b", "c"],

      dialogVisible: false,

      startTime: "",
      endTime: "",

      column: "",
      orderId: "",
      salerId: "",

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
      this.salerId = ''
      this.orderId = ''
    },
    // 新增按钮
    addOrder() {
      // 异步查询所有车辆，写入cars
      // 用户可能也是
      this.dialogVisible = true
      this.opreation = false
      this.order = {}
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