<script setup>
import TableDetails from '@/components/manager/employee/table/OrderDetails.vue'
import XModal from '@/components/ui/XModal.vue'
import { useOrderStore } from '@/stores/order'
import { useTableStore } from '@/stores/table'
import { useUiStore } from '@/stores/ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tableStore = useTableStore()
const orderStore = useOrderStore()
const uiStore = useUiStore()

const order = ref({})
const orderItems = ref([])
const totalPrice = ref(0)
const confirmModal = ref(false)
const changeTableModal = ref(false)
const billModal = ref(false)
const intervalId = ref(null)
const allTables = ref([])
const qrImage = computed(
  () =>
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${import.meta.env.VITE_BASE_URL}`
)

const submitOrder = async () => {
  const unCompletedOrder = orderItems.value.some((item) => item.status === 'pending')
  if (unCompletedOrder) {
    uiStore.addToast({
      message: `Table ${order.value.tableId} can't close because there are some pending order`,
      type: 'error'
    })
  } else {
    await orderStore.submitOrder(order.value.id)
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
    return
  }
  tableStore.setCurrentTable(order.value.table)
  orderItems.value = await orderStore.getOrderItems(order.value.id)
  allTables.value = await tableStore.getAllTables()
  totalPrice.value = orderItems.value
    .filter((item) => item.status === 'completed')
    .reduce((acc, orderItem) => acc + orderItem.item.price * orderItem.quantity, 0)
}

const changeTable = async (tableId) => {
  await orderStore.changeTable(order.value.id, tableId)
  changeTableModal.value = false
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
  <div v-if="order">
    <TableDetails :order="order" :orderItems="orderItems" />

    <div class="flex justify-center mt-4">
      <router-link
        to="/employee/tables"
        class="bg-red-500 text-white px-4 py-2 rounded-md text-base font-semibold ml-4"
      >
        Back to tables
      </router-link>
      <button
        class="bg-yellow-500 text-white px-4 py-2 rounded-md text-base font-semibold ml-4"
        @click="changeTableModal = true"
      >
        Change Table
      </button>
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
      <img :src="`${qrImage}/order/${order.id}`" :alt="`QR Code for order`" class="w-full" />
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

    <XModal :show="changeTableModal" title="Change Table" @close="changeTableModal = false">
      <div class="flex flex-col gap-4">
        <p class="text-sm text-center text-theme-500">Select new table</p>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="table in allTables"
            :key="table.id"
            class="bg-blue-500 text-white px-4 py-2 rounded-md text-base font-semibold disabled:cursor-not-allowed"
            :class="{ 'bg-gray-500': table.id === order.tableId }"
            @click="changeTable(table.id)"
            :disabled="table.id === order.tableId"
          >
            {{ table.name.en }}
          </button>
        </div>
      </div>
    </XModal>
  </div>
</template>

<style scoped></style>
