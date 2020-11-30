import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

import Layout from '@/components/layout'

// 处理重复点击导航栏菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/car',
    component: Layout,
    meta: { title: '车辆管理', icon: 'el-icon-menu' },
    children: [
      {
        path: '',
        name: 'carList',
        component: () => import('@/views/goods/car/CarList'),
        meta: { title: '车辆列表', icon: 'el-icon-shopping-cart-2' }
      },
      {
        path: 'saleOrder',
        name: 'saleOrder',
        component: () => import('@/views/goods/car/SaleOrder'),
        meta: { title: '车辆销售订单', icon: 'el-icon-truck' }
      }]
  },
  {
    path: '/part',
    component: Layout,
    meta: { title: '配件管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: '',
        name: 'partList',
        component: () => import('@/views/goods/part/PartList'),
        meta: { title: '配件列表', icon: 'el-icon-cpu' }
      },
      {
        path: 'partOrder',
        name: 'partOrder',
        component: () => import('@/views/goods/part/PartsOrder'),
        meta: { title: '配件进货单', icon: 'el-icon-notebook-1' }
      }
    ]
  },
  {
    path: '/fix',
    component: Layout,
    meta: { title: '运维', icon: 'el-icon-phone' },
    children: [
      {
        path: '',
        name: 'orderList',
        component: () => import('@/views/fix/OrderList'),
        meta: { title: '维修订单列表', icon: 'el-icon-chat-dot-square' }
      },
      {
        path: 'operationList',
        name: 'operationList',
        component: () => import('@/views/fix/OperationList'),
        meta: { title: '运维人员列表', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: '/authority',
    component: Layout,
    children: [
      {
        path: '',
        name: 'userList',
        component: () => import('@/views/authority/UserList'),
        meta: { title: '用户列表', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/userOrderList',
    component: Layout,
    children: [
      {
        path: '',
        name: 'userOrderList',
        component: () => import('@/views/user/UserOrderList'),
        meta: { title: '订单', icon: 'el-icon-collection' }
      }
    ]
  },
  {
    path: '/carMaintain',
    component: Layout,
    children: [
      {
        path: '',
        name: 'userList',
        component: () => import('@/views/user/CarMaintain'),
        meta: { title: '车辆保养', icon: 'el-icon-bicycle' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '车辆维修', icon: 'el-icon-phone' },
    children: [
      {
        path: '',
        name: 'fixList',
        component: () => import('@/views/user/FixList'),
        meta: { title: '维修列表', icon: 'el-icon-chat-dot-square' }
      },
      {
        path: 'fixApply',
        name: 'fixApply',
        component: () => import('@/views/user/FixApply'),
        meta: { title: '维修申请', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue')
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
