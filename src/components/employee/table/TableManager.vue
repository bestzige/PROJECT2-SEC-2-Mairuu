<script setup>
import { onMounted, ref } from 'vue'
import { getItems } from '@/utils/fetch'
import { API_ENDPOINT } from '@/utils/constants'
import TableList from './TableList.vue'
const tables = ref([])

onMounted(async () => {
  try {
    const result = await getItems(`${API_ENDPOINT}/tables`)
    tables.value = result
  } catch (err) {
    console.log(err)
  }
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
