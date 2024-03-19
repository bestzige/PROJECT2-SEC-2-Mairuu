import { API_ENDPOINT } from '@/utils/constants'
import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'
import { useOrderStore } from './order'
import { ref } from 'vue'

export const useServiceCallStore = defineStore('service-call', () => {
  const isCalled = ref(false);
  
  const orderStore = useOrderStore()

  const getServiceCalls = async () => {
    return await fetch.getItems(`${API_ENDPOINT}/service-calls?_embed=table`)
  }

  const callService = async (orderId) => {
    isCalled.value = true
    setTimeout(() => {
      isCalled.value = false
    }, 5000); // 5 seconds
    if (!orderId) return
    const order = await orderStore.getOrder(orderId, false)
    if (!order) return
    if (order.status !== 'open') return
    const exist = order?.['service-calls'].filter(
      (serviceCall) =>
        serviceCall.status === 'pending' &&
        new Date(serviceCall.callDate).getTime() > new Date().getTime() - 1000 * 60 * 10 // 10 minutes
    )
    if (exist.length) return
    return await fetch.postItem(`${API_ENDPOINT}/service-calls`, {
      orderId: order.id,
      status: 'pending',
      callDate: new Date().toISOString()
    })
  }

  return {
    isCalled,
    getServiceCalls,
    callService
  }
})
