<script setup>
import { ref, onMounted } from 'vue'
import { getItems, postItem, putItem, deleteItem } from '../../utils/fetch'
import TableDetail from './TableDetail.vue'

const tables = ref([])

onMounted(async () => {
  tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
})

const editItemHandler = (table) => {
  table.isEditing = true
}

const saveItemHandler = async (table) => {
  try {
    if (table.id) {
      await putItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table.id, table) // ส่ง URL, ID และข้อมูลไปยัง putItem
    } else {
      await postItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table)
    }

    tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
  } catch (error) {
    console.error('Error:', error)
  }

  table.isEditing = false
}

const deleteItemHandler = async (id) => {
  await deleteItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, id) // ส่ง URL และ ID ไปยัง deleteItem

  tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
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
        @edit="() => editItemHandler(table)"
        @save="() => saveItemHandler(table)"
        @delete="() => deleteItemHandler(table.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
