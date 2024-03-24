<script setup>
import { onMounted, ref, watch } from 'vue'
import ConfirmModal from '../ui/ConfirmModal.vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import { useTableStore } from '@/stores/table'
const router = useRouter()
const orderStore = useOrderStore()
const tableStore = useTableStore()
const toggleModal = ref(false)
const selectedTable = ref(null)

const tableSelect = async (tableId) => {
  selectedTable.value = tableId
  const openOrder = await orderStore.getOpenOrderByTableId(selectedTable.value)
  if (openOrder) {
    await router.push(`/employee/table-detail/${selectedTable.value}`)
  } else {
    tableStore.setCurrentTable(selectedTable.value)
    toggleModal.value = true
  }
}
const closeModal = () => {
  toggleModal.value = false
  selectedTable.value = null
}
const openTable = () => {
  availableTables.value.push(selectedTable.value)
  closeModal()
}

const props = defineProps({
  tables: {
    type: Array,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})
const availableTables = ref([])
const getAvailableTables = async () => {
  availableTables.value = await tableStore.getAvailableTables()
  availableTables.value = availableTables.value.map((table) => table.id)
}
const setThemeByStatus = (tableId) => {
  const table = availableTables.value.find((id) => id === tableId)
  if (table) {
    return 'bg-theme-500 border-black'
  }
  return 'bg-theme-300 border-theme-500'
}
watch(availableTables, () => {
  getAvailableTables()
})
onMounted(() => {
  getAvailableTables()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full bg-gray-200 border-2 border-theme-500 rounded-lg">
      <div
        class="w-full h-auto text-5xl text-white text-center bg-theme-100 border-b-2 border-theme-500 rounded-t-lg py-4"
      >
        TABLES
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4 mx-auto items-center"
      >
        <button
          v-if="admin"
          class="mx-auto text-2xl w-44 h-36 flex justify-center items-center bg-theme-300 border-2 border-theme-500 rounded-lg hover:bg-theme-400 transition duration-300"
        >
          <span class="text-4xl">+</span>
        </button>
        <button
          v-for="(table, index) in tables"
          :key="index"
          class="mx-auto text-2xl w-44 h-36 flex justify-center border-2 rounded-lg hover:bg-theme-400 transition duration-300"
          :class="setThemeByStatus(table.id)"
          @click="tableSelect(table.id)"
        >
          {{ table.name.en }}
        </button>
      </div>
    </div>

    <ConfirmModal
      v-if="toggleModal"
      class="absolute"
      :tableId="selectedTable.value"
      @cancel="closeModal"
      @confirm="openTable"
    />
  </div>
</template>

<style scoped></style>
