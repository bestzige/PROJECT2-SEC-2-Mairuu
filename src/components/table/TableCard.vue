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
    type: 'success'
  })
}

onMounted(async () => {
  availableTables.value = await tableStore.getAvailableTables()
})
</script>

<template>
  <div v-if="order">
    <div class="flex justify-between py-2 px-4">
      <div class="text-3xl">Order # {{ order.id }} (Table {{ order.tableId }})</div>
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
          class="w-full text-black"
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
        class="bottom-0 right-0 bg-theme-400 text-white p-2 rounded-lg items-center flex justify-center"
        @click="tableSelectModal = true"
      >
        Change table for customer
      </button>
    </div>
    <div class="flex flex-row flex-wrap gap-3">
      <div class="w-full">
        <div class="flex flex-col gap-3 p-2">
          <div class="flex flex-row text-2xl">
            <div class="w-1/5">Item</div>
            <div class="w-1/5">Quantity</div>
            <div class="w-1/5">Price/EA</div>
            <div class="w-1/5">Total Price</div>
            <div class="w-1/5">Status</div>
          </div>
          <div v-for="(orderItem, index) in orderItems" :key="index" class="flex flex-row">
            <div class="w-1/5">{{ orderItem.item.name.en }}</div>
            <div class="w-1/5">{{ orderItem.quantity }}</div>
            <div class="w-1/5">{{ orderItem.item.price }}</div>
            <div class="w-1/5">{{ orderItem.quantity * orderItem.item.price }}</div>
            <div class="w-1/5">{{ orderItem.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
