<script setup>
import { getItems } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import TableList from '../table/TableList.vue'

const tables = ref([])

onMounted(async () => {
  const result = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables?_embed=orders`)
  tables.value = result
})
</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <TableList :tables="tables" />
    </div>
  </div>
</template>

<style scoped></style>
