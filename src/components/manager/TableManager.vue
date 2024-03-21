<script setup>
import TableDetail from './TableDetail.vue'
import { ref, onMounted } from 'vue'
import { getItems } from '../../utils/fetch'

const tables = ref([])

onMounted(async () => {
  tables.value = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
})

// const editItemHandler = (table) => {
//
// }

// const deleteItemHandler = (id) => {
//
// }
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
        @delete="() => deleteItemHandler(table.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
