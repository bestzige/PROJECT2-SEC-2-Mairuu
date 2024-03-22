<script setup>
import { ref, onMounted } from 'vue'
import { getItems, postItem, putItem } from '../../utils/fetch'
import TableDetail from './TableDetail.vue'

const tables = ref([])

onMounted(async () => {
  tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
})

const editTableHandler = async (table) => {
  table.isEditing = true
}

const saveTableHandler = async (table) => {
  try {
    if (table.id) {
      await putItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table.id, table)
    } else {
      await postItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table)
    }

    tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
  } catch (error) {
    console.error('Error:', error)
  }

  table.isEditing = false
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
        @edit="editTableHandler"
        @save="saveTableHandler"
        @delete="deleteItemHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
