<script setup>
import OrderHistoryTable from '@/components/order/OrderHistoryTable.vue'
import { useOrderStore } from '@/stores/order'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderStore = useOrderStore()

const orderItems = ref([])
const totalPrice = ref(0)

const refetchOrderItems = async () => {
  orderItems.value = await orderStore.getOrderItems(route.params.orderId)
  totalPrice.value = orderItems.value.reduce(
    (acc, orderItem) => acc + orderItem.item.price * orderItem.quantity,
    0
  )
}

onMounted(async () => {
  await refetchOrderItems().then(() => {
    setInterval(refetchOrderItems, 1000)
  })
})
</script>

<template>
  <div>
    <OrderHistoryTable :orderItems="orderItems" :totalPrice="totalPrice" />
  </div>
</template>
