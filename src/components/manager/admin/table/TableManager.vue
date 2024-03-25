<script setup>
import { ref, onMounted, computed } from 'vue'
import TableDetail from '@/components/manager/admin/table/TableDetail.vue'
import { useTableStore } from '@/stores/table'
import { stringValidator } from '@/utils/validators'
import XModal from '@/components/ui/XModal.vue'
import ManagerHeader from '@/components/manager/ManagerHeader.vue'
import TableButtonManager from '@/components/manager/admin/table/TableButtonManager.vue'

const tableStore = useTableStore()

const tables = ref([])
const isAddModalOpen = ref(false)

const tempNewTable = ref({
  name: { th: '', en: '' },
  defaultSize: 0
})

const isAddFormValid = computed(() => {
  return (
    stringValidator(tempNewTable.value.name.th) &&
    stringValidator(tempNewTable.value.name.en) &&
    tempNewTable.value.defaultSize > 0
  )
})

onMounted(async () => {
  await loadTables()
})

const deleteItemHandler = async (tableId) => {
  const deleteTable = await tableStore.deleteTable(tableId)
  if (deleteTable) {
    tables.value = tables.value.filter((table) => table.id !== tableId)
  }
}

const showAddModal = () => {
  isAddModalOpen.value = true
}
const closeModal = () => {
  isAddModalOpen.value = false
}

const saveTableHandler = async (table) => {
  const data = table.id ? table : tempNewTable.value
  const saveTable = await tableStore.saveTable(data)

  if (table.id) {
    const index = tables.value.findIndex((t) => t.id === table.id)
    if (index === -1) return
    tables.value[index] = saveTable
  } else {
    tables.value.push(saveTable)
    tempNewTable.value = {
      name: { th: '', en: '' },
      defaultSize: 0
    }
  }

  closeModal()
}

const loadTables = async () => {
  tables.value = await tableStore.getAllTables()
}
</script>

<template>
  <div class="flex flex-col w-full px-5 md:px-10 lg:px-20">
    <ManagerHeader>Table Manager</ManagerHeader>
    <div v-for="(table, index) in tables" :key="index">
      <TableDetail
        :table="table"
        :name="table.name"
        @save="saveTableHandler"
        @delete="deleteItemHandler"
      />
    </div>
    <TableButtonManager @click="showAddModal" center>
      <svg
        class="h-8 w-8 inline-block text-white mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" class="text-white" />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </TableButtonManager>

    <XModal
      :show="isAddModalOpen"
      size="lg"
      @close="closeModal"
      title="Add New Table"
      :close-when-click-outside="false"
    >
      <div class="sm:mt-0 sm:ml-4 sm:text-left">
        <div class="mt-4">
          <label for="table_name_th" class="block text-sm font-medium text-gray-700"
            >Table Name (Thai)</label
          >
          <input
            type="text"
            name="table_name_th"
            id="table_name_th"
            v-model="tempNewTable.name.th"
            class="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="mt-4">
          <label for="table_name_en" class="block text-sm font-medium text-gray-700"
            >Table Name (English)</label
          >
          <input
            type="text"
            name="table_name_en"
            id="table_name_en"
            v-model="tempNewTable.name.en"
            class="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="mt-4">
          <label for="table_defaultSize" class="block text-sm font-medium text-gray-700"
            >Table Size</label
          >
          <input
            type="number"
            name="table_defaultSize"
            id="table_defaultSize"
            v-model.number="tempNewTable.defaultSize"
            class="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="mt-4">
          <button
            @click="saveTableHandler"
            :disabled="!isAddFormValid"
            type="button"
            class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-400 disabled:opacity-50 w-full"
          >
            Create
          </button>
        </div>
      </div>
    </XModal>
  </div>
</template>

<style scoped></style>
