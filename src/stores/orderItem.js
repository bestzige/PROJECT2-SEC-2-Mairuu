//localhost:5002/order-items?status=pending&_sort=-orderDate
import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'

export const useOrderItemStore = defineStore('order-item', () => {
  const getOrderItems = async () => {
    return await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/order-items`)
  }
  const getPendingOrders = async () => {
    return await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/order-items?_embed=item&status=pending&_embed=order`
    )
  }
  const changeOrderStatus = async (id, status) => {
    console.log('id', id)
    console.log('status', status)
    return await fetch.patchItem(`${import.meta.env.VITE_API_ENDPOINT}/order-items`, id, {
      status: `${status}`
    })
  }

  return {
    getPendingOrders,
    getOrderItems,
    changeOrderStatus
  }
})
