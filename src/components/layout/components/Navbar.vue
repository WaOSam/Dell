<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <el-dropdown class="dropdown" trigger="click" @command="commandClick">
      <span class="el-dropdown-link"
        ><i
          class="el-icon-user-solid"
          style="
            margin-right: 5px;
            font-size: 22px;
            display: inline-block;
            vertical-align: middle;
          "
        />管理员：汤龙康</span
      >
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">系统首页</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    commandClick(command) {
      if (command === 'home') {
        this.$router.push('/')
      } else {
        this.$message({
          duration: 1500,
          message: '登出系统中！',
          type: 'error'
        })
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .dropdown {
    line-height: 46px;
    margin-right: 20px;
    height: 100%;
    float: right;
    cursor: pointer;
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>
