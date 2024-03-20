<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import TableCard from './TableCard.vue'
const route = useRoute()
const router = useRouter()
console.log(route.params.tableId)

const orderStore = useOrderStore()
const order = ref({})
const orderItems = ref([])
const totalPrice = ref(0)

const invtervalId = ref(null)

const refetchOrderItems = async () => {
  order.value = await orderStore.getOpenOrderByTableId(route.params.tableId)
  if (!order.value) {
    if (invtervalId.value) {
      clearInterval(invtervalId.value)
    }
    await router.push('/employee')
  } else {
    orderItems.value = await orderStore.getOrderItems(order.value.id)
    totalPrice.value = orderItems.value.reduce(
      (acc, orderItem) => acc + orderItem.item.price * orderItem.quantity,
      0
    )
  }
}

onMounted(async () => {
  await refetchOrderItems().then(() => {
    invtervalId.value = setInterval(refetchOrderItems, 1000)
  })
})
onUnmounted(() => {
  clearInterval(invtervalId.value)
})
</script>

<template>
  <div class="h-full max-h-96 bg-orange-600 overflow-auto">
    <!-- <div class="text-3xl"># {{ order.id }}</div>
    <div>{{ orderItems }}</div> -->
    <TableCard :order="order" :orderItems="orderItems" />
  </div>
  <div class="text-2xl">Total Price: {{ totalPrice }} baht</div>
  <div>
    <button class="bottom-0 right-0 bg-red-500 text-white p-2 rounded-lg">Clear Order</button>
  </div>
</template>

<style scoped></style>
