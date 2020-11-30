<template>
  <div class="app-container">
    <el-row
      style="padding-bottom: 15px"
      type="flex"
      align="middle"
      justify="space-between"
    >
      <el-col :span="3">
        <b>配件进货单</b>
      </el-col>
      <el-col :span="3" :push="4" :offset="1"> 配件ID: </el-col>
      <el-col :span="2">
        <el-input placeholder="请输入" v-model="partId" clearable size="small">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="clearInput">重置</el-button>
        <el-button type="primary" @click="conditionSearch">搜索</el-button
        ><el-button type="success" @click="addPartOrder">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eee', color: '#333' }"
    >
      <el-table-column type="index" label="序号" align="center" width="50px">
      </el-table-column>
      <el-table-column prop="nation" label="进货单编号" align="center">
      </el-table-column>
      <el-table-column prop="producttype" label="配件ID" align="center">
      </el-table-column>
      <el-table-column prop="alteredcolumn" label="配件名称" align="center">
      </el-table-column>
      <el-table-column prop="alteredcolumn" label="进货数量" align="center">
      </el-table-column>
      <el-table-column prop="altertype" label="进货日期" align="center">
      </el-table-column>
      <el-table-column prop="alteredreason" label="当前状态" align="center">
      </el-table-column>
      <el-table-column label="是否确定进货" align="center">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.purchase ? '已进货' : '待确认'"
            placement="right"
          >
            <el-switch
              v-model="scope.row.purchase"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.purchase"
              @change="purSure(scope.row)"
            >
            </el-switch>
          </el-tooltip>
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
      title="新增进货"
      :visible="dialogVisible"
      :show-close="false"
      width="30%"
    >
      <el-form :model="part" ref="part" label-width="150px">
        <el-form-item label="进货单编号：" hidden>
          <el-input class="input-width" v-model="part.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="配件ID：">
          <el-select
            v-model="part.partID"
            clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in parts"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <el-input class="input-width" v-model="part.partID"></el-input> -->
        </el-form-item>
        <el-form-item label="配件名称：">
          <el-input
            class="input-width"
            disabled
            v-model="part.partName"
          ></el-input>
        </el-form-item>
        <el-form-item label="配件数量：">
          <el-input class="input-width" v-model="part.num"></el-input>
        </el-form-item>
        <el-form-item label="进货日期：">
          <el-date-picker
            v-model="part.purDate"
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
      part: {
        "id": 1,
        "partID": "",
        "partName": "信息",
        "purDate": "34天",
        "status": "ddd",
        "num": 23
      },

      parts: ["配件A", "配件B"],

      dialogVisible: false,

      startTime: "",
      endTime: "",

      column: "",
      partId: "",
      partId: "",

      tableData: [{
        "nation": "json在线编辑器",
        "producttype": "删除",
        "alteredcolumn": "测试类型",
        "altertype": "空掉",
        "alteredreason": "玩玩而已",
        "alteredcontent": "增加java类生成",
        "purchase": false
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
      this.partId = ''
      this.partId = ''
    },
    // 新增按钮
    addPartOrder() {
      this.dialogVisible = true
      this.opreation = false
      this.order = {}
    },// 取消新增或者编辑
    cancelOperation() {
      this.dialogVisible = false

      this.$message({
        message: '操作取消！',
        type: 'info',
        duration: 1000
      })
    },
    // 确认进货操作
    purSure(row) {
      this.$confirm('是否要进行进货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        row.purchase = true
        // 网络请求删除
        this.$message({
          message: '进货成功！',
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