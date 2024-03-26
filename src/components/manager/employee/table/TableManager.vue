<script setup>
import { ref, onMounted } from 'vue'
import { useTableStore } from '@/stores/table'
import TablePreview from '@/components/manager/employee/table/TablePreview.vue'
import ManagerHeader from '@/components/manager/ManagerHeader.vue'
import { useOrderStore } from '@/stores/order'
import { useRouter } from 'vue-router'
import XModal from '@/components/ui/XModal.vue'

const router = useRouter()
const orderStore = useOrderStore()
const tableStore = useTableStore()
const confirmModal = ref(false)
const tables = ref([])
const availableTables = ref([])
const currentTable = ref(null)
const intervalId = ref(null)

const tableSelect = async (table) => {
  currentTable.value = table
  const openOrder = await orderStore.getOpenOrderByTableId(currentTable.value.id)
  if (openOrder) {
    await router.push(`/employee/table-detail/${table.id}`)
  } else {
    tableStore.setCurrentTable(table)
    confirmModal.value = true
  }
}

const closeModal = () => {
  confirmModal.value = false
  currentTable.value = null
}

const isTableAvailable = (table) => {
  return !!availableTables.value.find((t) => t.id === table.id)
}

const openTable = () => {
  const data = orderStore.openOrder(currentTable.value.id)
  if (data) {
    router.push(`/employee/table-detail/${currentTable.value.id}`)
  }

  closeModal()
}

const loadData = async () => {
  tables.value = await tableStore.getAllTables()
  availableTables.value = await tableStore.getAvailableTables()
}

onMounted(() => {
  loadData().then(() => {
    intervalId.value = setInterval(loadData, 5000)
  })
})
</script>

<template>
  <div class="flex flex-col w-full px-5 md:px-10 lg:px-20">
    <ManagerHeader>Table Manager</ManagerHeader>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4 mx-auto items-center text-white"
    >
      <TablePreview
        v-for="table in tables"
        :key="table.id"
        :table="table"
        :available="isTableAvailable(table)"
        @select="tableSelect"
      />
    </div>

    <div v-show="tables.length <= 0" class="text-3xl font-bold text-center mt-8">
      No tables found
    </div>

    <XModal
      :show="confirmModal"
      title="Confirm Table Open"
      @close="closeModal"
      closeWhenClickOutside
      v-if="currentTable"
    >
      <div class="flex flex-col gap-4">
        <div class="text-xl">
          Are you sure you want to open Table {{ currentTable.id }} for customer?
        </div>
        <div class="flex gap-4 w-full">
          <button
            class="bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg items-center flex justify-center transition duration-300 w-full"
            @click="openTable"
          >
            Confirm
          </button>
          <button
            class="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg items-center flex justify-center transition duration-300 w-full"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </XModal>
  </div>
</template>
