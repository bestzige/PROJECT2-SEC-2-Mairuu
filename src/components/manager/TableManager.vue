<script setup>
import { ref, onMounted, computed } from 'vue'
import { getItems, postItem, putItem } from '../../utils/fetch'
import TableDetail from './TableDetail.vue'

const tables = ref([])
const isAddModalOpen = ref(false)

const tempNewTable = ref({
  name: { th: '', en: '' },
  defaultSize: 0
})

const isAddFormValid = computed(() => {
  return (
    tempNewTable.value.name.th.trim() !== '' &&
    tempNewTable.value.name.en.trim() !== '' &&
    tempNewTable.value.defaultSize > 0
  )
})
onMounted(async () => {
  tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
})

const editTableHandler = async (table) => {
  table.isEditing = true
}

const deleteItemHandler = async (tableId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/tables/${tableId}`)
    if (!response.ok) {
      throw new Error('Table not found')
    }

    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/tables/${tableId}`, {
      method: 'DELETE'
    })

    tables.value = tables.value.filter((table) => table.id !== tableId)
  } catch (error) {
    console.error('Error deleting table:', error)
  }
}

const showAddModal = () => {
  isAddModalOpen.value = true
}
const closeModal = () => {
  isAddModalOpen.value = false
}

const saveTableHandler = async (table) => {
  try {
    if (table.id) {
      await putItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table.id, table)
    } else {
      await postItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table)
    }

    tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
    closeModal()
  } catch (error) {
    console.error('Error:', error)
  }
}

const saveNewTable = async () => {
  try {
    const newTable = await postItem(
      `${import.meta.env.VITE_API_ENDPOINT}/tables`,
      tempNewTable.value
    )
    if (newTable) {
      tables.value.push(newTable)
      closeModal()
    }
  } catch (error) {
    console.error('Error adding product:', error)
  }
}

const loadTables = async () => {
  try {
    const response = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
    tables.value = response
  } catch (error) {
    console.error('Error fetching tables:', error)
  }
}

loadTables()
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="bg-theme-500 text-white w-3/4 p-20 m-10 text-center">
        <h1 class="text-7xl font-bold">Table Management</h1>
      </div>
    </div>
    <div v-for="(table, index) in tables" :key="index">
      <TableDetail
        :table="table"
        :name="table.name"
        @edit="editTableHandler"
        @save="saveTableHandler"
        @delete="deleteItemHandler"
      />
    </div>
    <div class="flex justify-center">
      <div class="w-3/4 my-1">
        <button
          @click="showAddModal"
          class="text-sm text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 w-full"
        >
          <div
            class="py-4 px-4 bg-theme-500 text-center text-4xl font-semibold flex items-center justify-center text-white"
          >
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
          </div>
        </button>
      </div>
    </div>

    <div v-if="isAddModalOpen" class="fixed inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <button @click="closeModal" type="button" class="absolute top-0 right-0 mt-4 mr-4">
                <span class="sr-only">Close</span>

                <svg
                  class="h-6 w-6 text-gray-700 hover:text-gray-500 transition-colors"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div class="sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium text-gray-900">Add New Table</h3>
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
                    v-model="tempNewTable.defaultSize"
                    class="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="mt-4">
                  <button
                    @click="saveNewTable"
                    :disabled="!isAddFormValid"
                    type="button"
                    class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md focus:outline-none focus:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
