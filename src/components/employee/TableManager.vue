<script setup>
import { getItem, getItems } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
const tables = ref()
const orders = ref({})
const choosenTable = ref(0)
const tableStatus = ref('available')
const choosenTool = ref()
onMounted(async () => {
  try {
    const result = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
    tables.value = result
  } catch (err) {
    console.log(err)
  }
})
const loadOrdersOfTable = async () => {
  try {
    const result = await getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/orders/${choosenTable.value}?_embed=`
    )
    orders.value = result
  } catch (err) {
    console.log(err)
  }
}
const clickTable = async (tableId) => {
  try {
    choosenTool.value = ''
    choosenTable.value = tableId
    const result = await getItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, tableId)
    tableStatus.value = result.status
  } catch (err) {
    console.log(err)
  }
}
const clickTool = (tool) => {
  choosenTool.value = tool
  if (tool === 'order') {
    loadOrdersOfTable()
  }
}
const clearTable = () => {
  choosenTable.value = 0
  choosenTool.value = ''
  orders.value = {}
}
</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <div class="w-7/12 bg-blue-200">
        <div class="w-full h-auto text-5xl text-center bg-blue-500">TABLES</div>
        <div class="flex flex-row gap-3 flex-wrap justify-around py-2">
          <button
            v-for="(table, index) in tables"
            :key="index"
            class="text-2xl border-2 w-44 h-36 flex justify-center"
            :class="choosenTable == table.id ? 'border-green-400' : ''"
            @click="clickTable(table.id)"
          >
            {{ table.name.en }}
          </button>
        </div>
      </div>
      <div class="w-5/12 bg-red-200 flex flex-col">
        <div class="w-full h-auto text-5xl text-center bg-red-500">MANAGER</div>
        <div class="h-5/6 bg-slate-500 text-2xl">
          <div v-if="choosenTool == 'order'">
            <div v-for="(order, index) in orders.items" :key="index" class="flex">
              {{ order }}
            </div>
          </div>
          <div v-else-if="choosenTool == 'bill'">{{ orders.totalPrice }} Baht</div>
        </div>
        <div class="flex flex-row text-3xl">
          <button
            class="w-1/3 text-center border"
            :class="choosenTool == 'order' ? 'bg-green-400' : ''"
            @click="clickTool('order')"
            :disabled="tableStatus == 'available' || choosenTable <= 0"
          >
            ORDER
          </button>
          <button
            class="w-1/3 text-center border"
            :class="choosenTool == 'bill' ? 'bg-green-400' : ''"
            @click="clickTool('bill')"
            :disabled="tableStatus == 'available' || choosenTable <= 0"
          >
            BILL
          </button>
          <button
            class="w-1/3 text-center border"
            :class="choosenTool == 'clear' ? 'bg-green-400' : ''"
            @click="clearTable"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
