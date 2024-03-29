import AdminLayout from '@/layouts/AdminLayout.vue'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import OrderLayout from '@/layouts/OrderLayout.vue'
import StoreLayout from '@/layouts/StoreLayout.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderCartView from '@/views/OrderCartView.vue'
import OrderHistoryView from '@/views/OrderHistoryView.vue'
import OrderMenuView from '@/views/OrderMenuView.vue'
import OrderView from '@/views/OrderView.vue'
import AdminProductManagerView from '@/views/manager/admin/AdminProductManagerView.vue'
import AdminTableManagerView from '@/views/manager/admin/AdminTableManagerView.vue'
import AdminTaskView from '@/views/manager/admin/AdminTaskView.vue'
import EmployeeTableDetailsView from '@/views/manager/employee/EmployeeTableDetailsView.vue'
import EmployeeTaskView from '@/views/manager/employee/EmployeeTaskView.vue'
import EmplyeeOrderManagerView from '@/views/manager/employee/EmployeeOrderManagerView.vue'
import EmplyeeTableListView from '@/views/manager/employee/EmplyeeTableListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: StoreLayout,
      children: [
        {
          path: '',
          name: 'home',
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
          component: OrderHistoryView
        },
        {
          path: 'cart',
          name: 'order-cart',
          component: OrderCartView
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
          component: EmployeeTaskView
        },
        {
          path: 'tables',
          name: 'employee-tables',
          component: EmplyeeTableListView
        },
        {
          path: 'table-detail/:tableId',
          name: 'employee-table-detail',
          component: EmployeeTableDetailsView
        },
        {
          path: 'order-manager',
          name: 'employee-order-manager',
          component: EmplyeeOrderManagerView
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
          component: AdminTaskView
        },
        {
          path: 'table-manager',
          name: 'admin-table-manager',
          component: AdminTableManagerView
        },
        {
          path: 'product-manager',
          name: 'admin-product-manager',
          component: AdminProductManagerView
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
