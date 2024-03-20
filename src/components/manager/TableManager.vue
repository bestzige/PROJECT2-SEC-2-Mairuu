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
