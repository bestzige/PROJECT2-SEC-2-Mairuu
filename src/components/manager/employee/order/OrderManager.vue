<script setup>
import { useOrderItemStore } from '@/stores/orderItem'
import { onMounted, ref, onUnmounted } from 'vue'
import XModal from '@/components/ui/XModal.vue'
import ManagerHeader from '@/components/manager/ManagerHeader.vue'
import OrderItem from './OrderItem.vue'

const orderItemStore = useOrderItemStore()

const orderItems = ref([])
const invtervalId = ref(null)

const isModalOpen = ref(false)
const currStatus = ref('')
const currOrderItem = ref({})

const openModal = (orderItem, status) => {
  isModalOpen.value = true
  currStatus.value = status
  currOrderItem.value = orderItem
}

const loadOrderItems = async () => {
  orderItems.value = await orderItemStore.getPendingOrders()
}

const changeStatus = async () => {
  const changed = await orderItemStore.changeOrderStatus(currOrderItem.value.id, currStatus.value)
  closeModal()
  if (!changed) return
  orderItems.value = orderItems.value.filter((orderItem) => orderItem.id !== currOrderItem.value.id)
}

const closeModal = () => {
  isModalOpen.value = false
  currStatus.value = ''
  currOrderItem.value = {}
}

onMounted(() => {
  loadOrderItems().then(() => {
    invtervalId.value = setInterval(loadOrderItems, 1000)
  })
})

onUnmounted(() => {
  clearInterval(invtervalId.value)
})
</script>

<template>
  <div class="flex flex-col w-full px-5 md:px-10 lg:px-20">
    <ManagerHeader>Order Manager</ManagerHeader>

    <div class="flex flex-col gap-4 mt-4">
      <OrderItem
        v-for="orderItem in orderItems"
        :key="orderItem.id"
        :orderItem="orderItem"
        @openModal="openModal"
      />
    </div>

    <div v-show="orderItems.length <= 0" class="text-3xl font-bold text-center mt-8">
      No pending orders
    </div>

    <XModal
      :title="`Are you sure you want to ${currStatus} this order?`"
      :show="isModalOpen"
      @close="closeModal"
      class="flex justify-center items-center"
    >
      <button
        @click="changeStatus"
        class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg items-center flex justify-center h-12 w-full transition duration-300"
        :class="{ 'bg-red-500 hover:bg-red-600': currStatus === 'cancelled' }"
      >
        Yes, {{ currStatus }} this order now
      </button>
    </XModal>
  </div>
</template>

<style scoped></style>
