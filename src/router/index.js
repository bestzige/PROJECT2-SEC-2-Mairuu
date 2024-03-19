import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderLayout from '@/layouts/OrderLayout.vue'
import OrderView from '@/views/OrderView.vue'
import OrderHistory from '@/views/OrderHistory.vue'
import OrderMenuView from '../views/OrderMenuView.vue'
import OrderCart from '@/views/OrderCart.vue'
import StoreLayout from '@/layouts/StoreLayout.vue'

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
          component: OrderView,
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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
