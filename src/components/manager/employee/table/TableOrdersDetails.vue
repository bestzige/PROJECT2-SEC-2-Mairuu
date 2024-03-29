<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import TableDetails from '@/components/manager/employee/table/OrderDetails.vue'
import { useRoute, useRouter } from 'vue-router'
import { useTableStore } from '@/stores/table'
import { useOrderStore } from '@/stores/order'
import { useUiStore } from '@/stores/ui'
import XModal from '@/components/ui/XModal.vue'

const route = useRoute()
const router = useRouter()
const tableStore = useTableStore()
const orderStore = useOrderStore()
const uiStore = useUiStore()

const order = ref({})
const orderItems = ref([])
const totalPrice = ref(0)
const confirmModal = ref(false)
const billModal = ref(false)
const intervalId = ref(null)
const qrImage = computed(
  () =>
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${import.meta.env.VITE_BASE_URL}/order/${order.value.id || ''}`
)

const submitOrder = async () => {
  const unCompletedOrder = orderItems.value.some((item) => item.status === 'pending')
  if (!unCompletedOrder) {
    await orderStore.submitOrder(order.value.id)
  } else {
    uiStore.addToast({
      message: `Table ${order.value.tableId} can't close because there are some pending order`,
      type: 'error'
    })
  }

  confirmModal.value = false
}

const loadOrder = async () => {
  order.value = await orderStore.getOpenOrderByTableId(route.params.tableId)
  if (!order.value) {
    if (intervalId.value) {
      clearInterval(intervalId.value)
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

onMounted(() => {
  loadOrder().then(() => {
    intervalId.value = setInterval(loadOrder, 1000)
  })
})

onUnmounted(() => {
  clearInterval(intervalId.value)
})
</script>

<template>
  <div>
    <TableDetails :order="order" :orderItems="orderItems" />

    <div class="flex justify-center mt-4">
      <router-link
        to="/employee/tables"
        class="bg-red-500 text-white px-4 py-2 rounded-md text-base font-semibold"
      >
        Back to tables
      </router-link>
      <p class="text-2xl font-bold ml-4 text-theme-500">Total Price: {{ totalPrice }}฿</p>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md text-base font-semibold ml-4"
        @click="confirmModal = true"
      >
        Submit Order
      </button>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-base font-semibold ml-4"
        @click="billModal = true"
      >
        Get Bill
      </button>
    </div>

    <XModal :show="confirmModal" title="Confirm Order Submission" @close="confirmModal = false">
      <p class="text-xl text-center text-theme-500">Total Price: {{ totalPrice }}฿</p>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md text-base font-semibold mt-4 w-full"
        @click="submitOrder"
      >
        Yes, submit this order
      </button>
    </XModal>

    <XModal :show="billModal" title="Bill" @close="billModal = false">
      <img :src="qrImage" :alt="`QR Code for order`" class="w-full" />
      <p class="text-center text-theme-500 mt-4">Scan QR code to order food</p>
      <p class="text-center text-theme-500">Table: {{ order.tableId }}</p>
      <p class="text-center text-theme-500">Order: {{ order.id }}</p>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md text-base font-semibold mt-4 w-full"
        @click="billModal = false"
      >
        Close
      </button>
    </XModal>
  </div>
</template>

<style scoped></style>
