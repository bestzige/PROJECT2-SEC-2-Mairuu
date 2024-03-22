<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import TableCard from './TableCard.vue'
import { useTableStore } from '@/stores/table'
import { patchItem } from '@/utils/fetch'
import XModal from '../ui/XModal.vue'
const route = useRoute()
const router = useRouter()
const tableStore = useTableStore()

const orderStore = useOrderStore()
const order = ref({})
const orderItems = ref([])
const totalPrice = ref(0)

const invtervalId = ref(null)
const tableId = ref(route.params.tableId)
const isModalOpen = ref(false)
const refetchOrderItems = async () => {
  order.value = await orderStore.getOpenOrderByTableId(tableId.value)
  if (!order.value) {
    if (invtervalId.value) {
      clearInterval(invtervalId.value)
    }
    await router.push('/employee/tables')
  } else {
    tableStore.setCurrentTable(order.value.table)
    orderItems.value = await orderStore.getOrderItems(order.value.id)
    totalPrice.value = orderItems.value
      .filter((item) => item.status === 'completed')
      .reduce((acc, orderItem) => acc + orderItem.item.price * orderItem.quantity, 0)
  }
}
const closeOrder = async () => {
  await patchItem(`${import.meta.env.VITE_API_ENDPOINT}/orders`, order.value.id, {
    status: 'closed'
  })
}

onMounted(async () => {
  await refetchOrderItems().then(() => {
    invtervalId.value = setInterval(refetchOrderItems, 1000)
  })
})
onUnmounted(() => {
  clearInterval(invtervalId.value)
})

watch(
  () => route.params.tableId,
  async (newTableId) => {
    tableId.value = newTableId
    await refetchOrderItems()
  }
)
</script>

<template>
  <div class="h-full max-h-96 overflow-auto">
    <!-- <div class="text-3xl"># {{ order.id }}</div>
    <div>{{ orderItems }}</div> -->
    <TableCard :order="order" :orderItems="orderItems" />
  </div>

  <div class="flex justify-around my-10 h-20 items-center">
    <router-link
      to="/employee/tables"
      class="bg-red-500 text-white p-2 rounded-lg items-center justify-center flex h-12 w-32"
      >Go Back</router-link
    >

    <div class="text-2xl">Total Price: {{ totalPrice }} baht</div>
    <button
      class="bottom-0 right-0 bg-green-500 text-white p-2 rounded-lg items-center flex justify-center h-12 w-32"
      @click="isModalOpen = true"
    >
      Submit Order
    </button>
    <XModal
      title="Are your sure to close this order?"
      :show="isModalOpen"
      @close="isModalOpen = false"
      class="flex justify-center items-center"
    >
      <button
        @click="closeOrder"
        class="bottom-0 right-0 bg-green-500 text-white p-2 rounded-lg items-center flex justify-center h-12 w-full"
      >
        Yes, close this order now
      </button>
    </XModal>
  </div>
</template>

<style scoped></style>
