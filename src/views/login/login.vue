<template>
  <div>
    <el-tabs v-model="activeName" class="login" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="name"
            ><el-input v-model.trim="ruleForm.name"></el-input
          ></el-form-item>

          <el-form-item label="密码" prop="pass"
            ><el-input
              type="password"
              v-model.trim="ruleForm.pass"
              auto-complete="off"
            ></el-input
          ></el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >

            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass")
        }

        callback()
      }
    }
    return {
      activeName: "first",
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
      },
    }
  },

  methods: {
    //选项卡切换
    handleClick(tab, event) { },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: "success",
            message: "登录成功",
          })
          // 后台查询用户信息

          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("name", this.ruleForm.name)

          if (this.ruleForm.name === "sam") {
            sessionStorage.setItem("isAdmin", true)
            this.$router.push("/home")
          } else {
            this.$router.push('/userOrderList')
          }

          setTimeout(() => {
            location.reload()
          }, 300)
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
  }
};
</script>
 
<style lang="scss">
.login {
  position: absolute;
  left: 40%;
  top: 25%;
  width: 400px;
}

.el-tabsitem {
  text-align: center;
  width: 60px;
}
</style>