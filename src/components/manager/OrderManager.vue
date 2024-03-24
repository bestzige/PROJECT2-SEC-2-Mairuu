<script setup>
import { useOrderItemStore } from '@/stores/orderItem'
import { onMounted, ref, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import XModal from '../ui/XModal.vue'

const uiStore = useUiStore()
const useOrderItem = useOrderItemStore()
const orderItems = ref([])
const getOrderItems = async () => {
  orderItems.value = await useOrderItem.getPendingOrders()
}
const isModalOpen = ref(false)
const currStatus = ref('')
const currOrderItem = ref({})
const openModal = (orderItem, status) => {
  isModalOpen.value = true
  currStatus.value = status
  currOrderItem.value = orderItem
}
const invtervalId = ref(null)
const changeStatus = async () => {
  await useOrderItem.changeOrderStatus(currOrderItem.value.id, currStatus.value)
  orderItems.value = orderItems.value.filter((item) => item.id !== currOrderItem.value.id)
  if (currStatus.value === 'completed') {
    uiStore.addToast({
      message: `sucuessfully pending order${currOrderItem.value.id} to Table ${currOrderItem.value.order.tableId}`,
      type: 'success',
      timeout: 2000
    })
  } else {
    uiStore.addToast({
      message: `cancelled order${currOrderItem.value.id} of Table ${currOrderItem.value.order.tableId}`,
      type: 'error',
      timeout: 2000
    })
  }

  isModalOpen.value = false
  currStatus.value = ''
  currOrderItem.value = {}
}
onMounted(async () => {
  getOrderItems()
  await getOrderItems().then(() => {
    invtervalId.value = setInterval(getOrderItems, 1000)
  })
})
onUnmounted(() => {
  clearInterval(invtervalId.value)
})
</script>

<template>
  <div>
    <XModal
      :title="`You want to ${currStatus} this order?`"
      :show="isModalOpen"
      @close="isModalOpen = false"
      class="flex justify-center items-center"
    >
      <button
        @click="changeStatus"
        class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg items-center flex justify-center h-12 w-full transition duration-300"
      >
        Yes, {{ currStatus }} this order now
      </button>
    </XModal>
    <div class="flex justify-center">
      <div class="bg-theme-500 text-white w-4/5 p-2 text-center rounded-3xl">
        <h1 class="text-4xl font-bold">Order Management</h1>
      </div>
    </div>
    <div
      v-for="(orderItem, index) in orderItems"
      :key="index"
      class="flex items-center gap-2 mb-2 mx-4 overflow-auto"
    >
      <img :src="orderItem.item.image" alt="item" class="w-14 h-14 object-cover rounded-md" />
      <div class="flex flex-row justify-between w-full font-bold">
        <div class="flex flex-col">
          <p>table:{{ orderItem.order.tableId }}</p>
          <p>order#{{ orderItem.id }}</p>
        </div>
        <div class="flex flow-row gap-2">
          <div class="flex flex-col items-end">
            <p class="text-right">{{ orderItem.item.name.en }} ({{ orderItem.quantity }}x)</p>
            <div class="flex gap-2">
              <p class="text-right">
                {{ orderItem.status }}
              </p>
            </div>
          </div>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
            :disabled="orderItem.item.stock <= 0"
            @click="openModal(orderItem, 'completed')"
          >
            Confirm Order
          </button>

          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="openModal(orderItem, 'cancelled')"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
