<script setup>
import { getItems, patchItem } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import XModal from '../ui/XModal.vue'
import { useTableStore } from '@/stores/table'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
const router = useRouter()
const tableStore = useTableStore()
const uiStore = useUiStore()
const props = defineProps({
  order: {
    type: Object
  },
  orderItems: {
    type: Array,
    required: true
  }
})

const selectedTable = ref(props.order.tableId)
const availableTables = ref([])
const tableSelectModal = ref(false)

const changeTable = async (tableId) => {
  await patchItem(`${import.meta.env.VITE_API_ENDPOINT}/orders`, props.order.id, {
    tableId: `${tableId}`
  })

  await router.push(`/employee/table-detail/${tableId}`)
  tableSelectModal.value = false
  availableTables.value = await tableStore.getAvailableTables()
  uiStore.addToast({
    message: `sucuessfully changed to Table ${tableId}`,
    type: 'success',
    timeout: 2000
  })
}

onMounted(async () => {
  availableTables.value = await tableStore.getAvailableTables()
})
</script>

<template>
  <div v-if="order">
    <div
      class="flex justify-between py-4 px-6 bg-gradient-to-r from-theme-300 to-theme-200 rounded-t-lg"
    >
      <div class="text-4xl text-white">Order # {{ order.id }} (Table {{ order.tableId }})</div>
      <XModal
        :show="tableSelectModal"
        title="Change table for customer"
        size="lg"
        @close="tableSelectModal = false"
      >
        <select
          v-model="selectedTable"
          @change="changeTable(selectedTable)"
          placeholder="Select table"
          class="w-full text-black rounded-lg p-2"
        >
          <option disabled selected class="text-black">
            {{ order.tableId }}
          </option>
          <option v-for="table in availableTables" :key="table.id" :value="table.id">
            {{ table.id }}
          </option>
        </select>
      </XModal>
      <button
        class="bg-theme-500 hover:bg-theme-400 text-white p-2 rounded-lg items-center flex justify-center transition duration-300"
        @click="tableSelectModal = true"
      >
        Change table for customer
      </button>
    </div>
    <div class="flex flex-col gap-4 p-4">
      <div class="bg-theme-100 text-theme-500 font-bold text-xl py-2 px-4 rounded-lg">
        Order Details
      </div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="text-left">Item</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Price/EA</th>
              <th class="text-left">Total Price</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orderItem, index) in orderItems" :key="index">
              <td>{{ orderItem.item.name.en }}</td>
              <td>{{ orderItem.quantity }}</td>
              <td>{{ orderItem.item.price }}</td>
              <td>{{ orderItem.quantity * orderItem.item.price }}</td>
              <td>{{ orderItem.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
