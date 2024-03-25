<script setup>
import OrderHistoryList from '@/components/order/OrderHistoryList.vue'
import ServiceCallButton from '@/components/service-call/ServiceCallButton.vue'
import AppBar from '@/components/ui/AppBar.vue'
import BackButton from '@/components/ui/BackButton.vue'
import { useOrderStore } from '@/stores/order'

import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderStore = useOrderStore()

const orderItems = ref([])
const totalPrice = ref(0)
const invtervalId = ref(null)

const refetchOrderItems = async () => {
  orderItems.value = await orderStore.getOrderItems(route.params.orderId)
  totalPrice.value = orderItems.value
    .filter((item) => item.status === 'completed')
    .reduce((acc, orderItem) => acc + orderItem.item.price * orderItem.quantity, 0)
}

onMounted(async () => {
  await refetchOrderItems()
  invtervalId.value = setInterval(async () => {
    await refetchOrderItems()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(invtervalId.value)
})
</script>

<template>
  <div>
    <OrderHistoryList :orderItems="orderItems" :totalPrice="totalPrice" />

    <AppBar>
      <div class="flex justify-between items-center gap-4">
        <ServiceCallButton />
        <BackButton :to="`/order/${$route.params.orderId}`" />
      </div>
    </AppBar>
  </div>
</template>
