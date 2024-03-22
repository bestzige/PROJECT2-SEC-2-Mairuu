import TableOrdersDetail from '@/components/table/TableOrdersDetail.vue'
import Table from '@/components/table/Table.vue'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import OrderLayout from '@/layouts/OrderLayout.vue'
import StoreLayout from '@/layouts/StoreLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderCart from '@/views/OrderCart.vue'
import OrderHistory from '@/views/OrderHistory.vue'
import OrderView from '@/views/OrderView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderMenuView from '../views/OrderMenuView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import ProductManager from '@/components/manager/ProductManager.vue'
import OrderManager from '@/components/manager/OrderManager.vue'
import TableManager from '@/components/manager/TableManager.vue'
import EmployeeTask from '@/components/employee/EmployeeTask.vue'
import AdminTask from '@/components/admin/AdminTask.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StoreLayout,
      children: [
        {
          path: '',
          name: 'home-view',
          component: HomeView
        }
      ]
    },
    {
      path: '/order/:orderId',
      name: 'order',
      component: OrderLayout,
      children: [
        {
          path: '',
          name: 'order-home',
          component: OrderView
        },
        {
          path: 'history',
          name: 'order-history',
          component: OrderHistory
        },
        {
          path: 'cart',
          name: 'order-cart',
          component: OrderCart
        },
        {
          path: 'menu',
          name: 'order-menu',
          component: OrderMenuView
        },
        {
          path: 'menu/:categoryId',
          name: 'order-menu-category',
          component: OrderMenuView
        }
      ]
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeLayout,
      children: [
        {
          path: '',
          name: 'employee-home',
          component: EmployeeTask
        },
        {
          path: 'tables',
          name: 'tables',
          component: Table
        },
        {
          path: 'table-detail/:tableId',
          name: 'table-detail',
          component: TableOrdersDetail
        },
        {
          path: 'order-manager',
          name: 'order-manager',
          component: OrderManager
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin-home',
          component: AdminTask
        },
        {
          path: 'table-manager',
          name: 'table-manager',
          component: TableManager
        },
        {
          path: 'product-manager',
          name: 'product-manager',
          component: ProductManager
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
