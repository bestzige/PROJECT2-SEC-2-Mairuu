<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import ItemCard from './ItemCard.vue'
const route = useRoute()
console.log(route.params.tableId)

const orderStore = useOrderStore()
const order = ref({})
const orderItems = ref([])
const totalPrice = ref(0)

const refetchOrderItems = async () => {
  order.value = await orderStore.getOpenOrderByTableId(route.params.tableId)
  orderItems.value = await orderStore.getOrderItems(order.value.id)
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
    <!-- <div class="text-3xl"># {{ order.id }}</div>
    <div>{{ orderItems }}</div> -->
    <ItemCard :order="order" :orderItems="orderItems" :totalPrice="totalPrice" />
  </div>
</template>

<style scoped></style>
