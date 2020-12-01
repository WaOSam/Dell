<template>
  <div>
    <el-card shadow="never">
      <span class="font-title-medium">订单详情</span>
      <el-table
        border
        class="standard-margin"
        ref="productTable"
        :data="productList"
      >
        <el-table-column label="维修订单号" width="160" align="center">
          <template slot-scope="scope">
            <img style="height: 80px" :src="scope.row.productPic" />
          </template>
        </el-table-column>
        <el-table-column label="购买订单号" align="center">
          <template slot-scope="scope">
            <span class="font-small">{{ scope.row.productName }}</span
            ><br />
            <span class="font-small">品牌：{{ scope.row.productBrand }}</span>
          </template>
        </el-table-column>
        <!-- 维修理由描述、维修申请时间、当前状态 -->
        <el-table-column label="维修理由描述" width="180" align="center">
          <template slot-scope="scope">
            <span class="font-small">{{ scope.row.productRealPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维修申请时间" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.productAttr }}</template>
        </el-table-column>
        <el-table-column label="当前状态" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.productCount }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never">
      <span class="font-title-medium">维修计划</span>
      <el-table
        border
        class="standard-margin"
        ref="productTable"
        :data="productList"
      >
        <el-table-column label="所需配件" align="center">
          <template slot-scope="scope">
            <span class="font-small">{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <!-- 维修理由描述、维修申请时间、当前状态 -->
        <el-table-column label="维修计划" width="180" align="center">
          <template slot-scope="scope">
            <span class="font-small"
              >价格：￥{{ scope.row.productRealPrice }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="运维人员工号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.productAttr }}</template>
        </el-table-column>
        <el-table-column label="运维人员姓名" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.productCount }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never" class="standard-margin">
      <span class="font-title-medium">修改维修计划</span>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >维修计划订单号</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            orderReturnApply.id
          }}</el-col>
        </el-row>

        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
            style="height: 52px; line-height: 32px"
            >确定所需配件
          </el-col>
          <el-col
            class="form-border font-small"
            style="height: 52px"
            :span="18"
          >
            <el-input
              size="small"
              v-model="updateStatusParam.returnAmount"
              :disabled="orderReturnApply.status !== 0"
              style="width: 500px"
            ></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
            style="height: 52px; line-height: 32px"
            >选择运维人员
          </el-col>
          <el-col
            class="form-border font-small"
            style="height: 52px"
            :span="18"
          >
            <el-select
              size="small"
              style="width: 200px"
              :disabled="orderReturnApply.status !== 0"
              v-model="updateStatusParam.companyAddressId"
            >
              <el-option
                v-for="address in companyAddressList"
                :key="address.id"
                :value="address.id"
                :label="address.addressName"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
            style="height: 52px; line-height: 32px"
            >维修计划</el-col
          >
          <el-col class="form-border font-small" :span="18">
            <el-input
              size="small"
              v-model="updateStatusParam.handleNote"
              style="width: 500px"
            ></el-input>
          </el-col>
        </el-row>
      </div>

      <div class="form-container-border">
        <div v-show="orderReturnApply.status !== 3">
          <el-row>
            <el-col
              class="form-border form-left-bg font-small"
              :span="6"
              style="height: 52px; line-height: 32px"
              >当前状态
            </el-col>
            <el-col
              class="form-border font-small"
              style="height: 52px"
              :span="18"
            >
              <el-select
                size="small"
                style="width: 200px"
                :disabled="orderReturnApply.status !== 0"
                v-model="updateStatusParam.companyAddressId"
              >
                <el-option
                  v-for="address in companyAddressList"
                  :key="address.id"
                  :value="address.id"
                  :label="address.addressName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <div
      style="margin-top: 15px; text-align: center"
      v-show="orderReturnApply.status === 0"
    >
      <el-button type="primary" size="small" @click="handleUpdateStatus(1)"
        >确认</el-button
      >
    </div>
  </div>
</template>
<script>
// import { getApplyDetail, updateApplyStatus } from '@/api/returnApply'
// import { fetchList } from '@/api/companyAddress'
import { formatDate } from '@/utils/date'

const defaultUpdateStatusParam = {
  companyAddressId: null,
  handleMan: 'admin',
  handleNote: null,
  receiveMan: 'admin',
  receiveNote: null,
  returnAmount: 0,
  status: 0
}
const defaultOrderReturnApply = {
  id: null,
  orderId: null,
  companyAddressId: null,
  productId: null,
  orderSn: null,
  createTime: null,
  memberUsername: null,
  returnAmount: null,
  returnName: null,
  returnPhone: null,
  status: null,
  handleTime: null,
  productPic: null,
  productName: null,
  productBrand: null,
  productAttr: null,
  productCount: null,
  productPrice: null,
  productRealPrice: null,
  reason: null,
  description: null,
  proofPics: null,
  handleNote: null,
  handleMan: null,
  receiveMan: null,
  receiveTime: null,
  receiveNote: null
}
export default {
  name: 'returnApplyDetail',
  data() {
    return {
      id: null,
      orderReturnApply: Object.assign({}, defaultOrderReturnApply),
      productList: null,
      proofPics: null,
      updateStatusParam: Object.assign({}, defaultUpdateStatusParam),
      companyAddressList: null
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
  },
  computed: {
    totalAmount() {
      if (this.orderReturnApply != null) {
        return this.orderReturnApply.productRealPrice * this.orderReturnApply.productCount
      } else {
        return 0
      }
    },
    currentAddress() {
      console.log("currentAddress()")
      let id = this.updateStatusParam.companyAddressId
      if (this.companyAddressList == null) return {}
      for (let i = 0; i < this.companyAddressList.length; i++) {
        let address = this.companyAddressList[i]
        if (address.id === id) {
          return address
        }
      }
      return null
    }
  },
  filters: {
    formatStatus(status) {
      if (status === 0) {
        return "待处理"
      } else if (status === 1) {
        return "退货中"
      } else if (status === 2) {
        return "已完成"
      } else {
        return "已拒绝"
      }
    },
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatRegion(address) {
      let str = address.province
      if (address.city != null) {
        str += "  " + address.city
      }
      str += "  " + address.region
      return str
    }
  },
  methods: {
    handleViewOrder() {
      this.$router.push({ path: '/oms/orderDetail', query: { id: this.orderReturnApply.orderId } })
    },
    getDetail() {
      getApplyDetail(this.id).then(response => {
        console.log("getDetail")
        this.orderReturnApply = response.data
        this.productList = []
        this.productList.push(this.orderReturnApply)
        if (this.orderReturnApply.proofPics != null) {
          this.proofPics = this.orderReturnApply.proofPics.split(",")
        }
        //退货中和完成
        if (this.orderReturnApply.status === 1 || this.orderReturnApply.status === 2) {
          this.updateStatusParam.returnAmount = this.orderReturnApply.returnAmount
          this.updateStatusParam.companyAddressId = this.orderReturnApply.companyAddressId
        }
        this.getCompanyAddressList()
      })
    },
    getCompanyAddressList() {
      fetchList().then(response => {
        console.log("getCompanyAddressList()")
        this.companyAddressList = response.data
        for (let i = 0; i < this.companyAddressList.length; i++) {
          if (this.companyAddressList[i].receiveStatus === 1 && this.orderReturnApply.status === 0) {
            this.updateStatusParam.companyAddressId = this.companyAddressList[i].id
          }
        }
      })
    },
    handleUpdateStatus(status) {
      this.updateStatusParam.status = status
      this.$confirm('是否要进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateApplyStatus(this.id, this.updateStatusParam).then(response => {
          this.$message({
            type: 'success',
            message: '操作成功!',
            duration: 1000
          })
          this.$router.back()
        })
      })
    }
  }
}
</script>
<style scoped>
.standard-margin {
  margin-top: 15px;
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}

.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 15px;
}

.form-left-bg {
  background: #f2f6fc;
}
</style>


