import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useOrderStore } from './order'
import { useUiStore } from './ui'

export const useServiceCallStore = defineStore('service-call', () => {
  const isCalled = ref(false)

  const uiStore = useUiStore()
  const orderStore = useOrderStore()

  const getServiceCalls = async () => {
    return await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/service-calls?_embed=table`)
  }

  const callService = async (orderId) => {
    if (!orderId) return
    const order = await orderStore.getOrder(orderId, false)
    if (!order) return uiStore.addToast({ message: 'Order not found', type: 'error' })
    if (order.status !== 'open')
      return uiStore.addToast({ message: 'Order is not open', type: 'error' })
    const exist = order?.['service-calls'].filter(
      (serviceCall) =>
        serviceCall.status === 'pending' &&
        new Date(serviceCall.callDate).getTime() > new Date().getTime() - 1000 * 60 * 10 // 10 minutes
    )
    if (exist.length)
      return uiStore.addToast({ message: 'Service call already made', type: 'error' })
    const data = await fetch.postItem(`${import.meta.env.VITE_API_ENDPOINT}/service-calls`, {
      orderId: order.id,
      status: 'pending',
      callDate: new Date().toISOString()
    })
    if (!data) return uiStore.addToast({ message: 'Service call failed', type: 'error' })
    isCalled.value = true
    setTimeout(() => {
      isCalled.value = false
    }, 5000) // 5 seconds
  }

  return {
    isCalled,
    getServiceCalls,
    callService
  }
})
