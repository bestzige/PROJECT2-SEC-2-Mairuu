//localhost:5002/order-items?status=pending&_sort=-orderDate
import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'
import { useUiStore } from './ui'

export const useOrderItemStore = defineStore('order-item', () => {
  const uiStore = useUiStore()

  const getOrderItems = async () => {
    return await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/order-items`)
  }

  const getPendingOrders = async () => {
    return await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/order-items?_embed=item&status=pending&_embed=order`
    )
  }

  const changeOrderStatus = async (id, status) => {
    const data = await fetch.patchItem(`${import.meta.env.VITE_API_ENDPOINT}/order-items`, id, {
      status: `${status}`
    })

    if (!data) {
      uiStore.addToast({
        message: 'Failed to update order status',
        type: 'error'
      })
    }

    uiStore.addToast({
      message: `Order status updated to ${status}`,
      type: 'success'
    })

    return data
  }

  return {
    getPendingOrders,
    getOrderItems,
    changeOrderStatus
  }
})
