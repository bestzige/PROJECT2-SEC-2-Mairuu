<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import TableCard from './TableCard.vue'
import { useTableStore } from '@/stores/table'
import { patchItem } from '@/utils/fetch'
import XModal from '../ui/XModal.vue'
import { useUiStore } from '@/stores/ui'
const route = useRoute()
const router = useRouter()
const tableStore = useTableStore()
const uiStore = useUiStore()

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
  const unCompletedOrder = orderItems.value.some((item) => item.status == 'pending')
  if (!unCompletedOrder) {
    await patchItem(`${import.meta.env.VITE_API_ENDPOINT}/orders`, order.value.id, {
      status: 'closed'
    })
    uiStore.addToast({
      message: `Table ${order.value.tableId} was closed`,
      type: 'success',
      timeout: 2000
    })
  } else {
    uiStore.addToast({
      message: `Table ${order.value.tableId} can't close because there are some pending order`,
      type: 'error',
      timeout: 2000
    })
  }
  isModalOpen.value = false
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
    <TableCard :order="order" :orderItems="orderItems" />
  </div>

  <div class="flex justify-around my-10 h-20 items-center">
    <router-link
      to="/employee/tables"
      class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg items-center justify-center flex h-12 w-32 transition duration-300"
      >Go Back</router-link
    >

    <div class="text-2xl font-bold text-theme-500">Total Price: {{ totalPrice }} baht</div>
    <button
      class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg items-center flex justify-center h-12 w-32 transition duration-300"
      @click="isModalOpen = true"
    >
      Submit Order
    </button>
    <XModal
      title="Are you sure you want to close this order?"
      :show="isModalOpen"
      @close="isModalOpen = false"
      class="flex justify-center items-center"
    >
      <button
        @click="closeOrder"
        class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg items-center flex justify-center h-12 w-full transition duration-300"
      >
        Yes, close this order now
      </button>
    </XModal>
  </div>
</template>

<style scoped></style>
