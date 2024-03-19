<script setup>
import { onMounted, ref } from 'vue'
import { getItem, getItems } from '@/utils/fetch'
import { API_ENDPOINT } from '@/utils/constants'
import TableList from './TableList.vue'
const tables = ref()
const orders = ref({})
const choosenTable = ref(0)
onMounted(async () => {
  try {
    const result = await getItems(`${API_ENDPOINT}/tables`)
    tables.value = result
  } catch (err) {
    console.log(err)
  }
})
const loadOrdersOfTable = async () => {
  try {
    const result = await getItems(`${API_ENDPOINT}/orders/${choosenTable.value}?_embed=`)
    orders.value = result
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <TableList :tables="tables" />

      <!-- <div class="w-5/12 bg-red-200 flex flex-col">
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
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
