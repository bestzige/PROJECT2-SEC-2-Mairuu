<script setup>
import { ref, watch } from 'vue'
import { getItems } from '@/utils/fetch'
const tables = ref()
getItems(`http://localhost:5001/tables`).then((result) => {
  tables.value = result
  console.log(result)
})
const orders = ref()
const choosenTable = ref(0)
const choosenTool = ref()
watch(choosenTable, async () => {
  getItems(`http://localhost:5001/orders/${choosenTable.value}?_embed=`).then((result) => {
    orders.value = result
    console.log(result)
  })
})
</script>

<template>
  <div>
    <div class="flex flex-row">
      <div class="w-7/12 bg-blue-200">
        <div class="w-full h-auto text-5xl text-center bg-blue-500">TABLES</div>
        <div class="flex flex-row gap-3 flex-wrap justify-around py-2">
          <div
            v-for="(table, index) in tables"
            :key="index"
            class="text-6xl border-2 w-44 h-36 flex justify-center"
            :class="choosenTable == table.id ? 'border-green-400' : ''"
            @click="choosenTable = table.id"
          >
            {{ table.id }}
          </div>
        </div>
      </div>
      <div class="w-5/12 bg-red-200 flex flex-col">
        <div class="w-full h-auto text-5xl text-center bg-red-500">MANAGER</div>
        <div class="h-5/6 bg-slate-500">
          <div v-if="choosenTool=='order'">
            <div v-for="(order, index) in orders" :key="index" class="flex">
              {{ order }}
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <button
            class="w-1/3 text-center border"
            :class="choosenTool == 'order' ? 'bg-green-400' : ''"
            @click="choosenTool = 'order'"
            :disabled="choosenTable <= 0"
          >
            ORDER
          </button>
          <div
            class="w-1/3 text-center border"
            :class="choosenTool == 'bill' ? 'bg-green-400' : ''"
            @click="choosenTool = 'bill'"
          >
            BILL
          </div>
          <div
            class="w-1/3 text-center border"
            :class="choosenTool == 'clear' ? 'bg-green-400' : ''"
            @click="choosenTool = 'clear'"
          >
            CLEAR
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
