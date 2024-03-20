import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('table', () => {
  const currentTable = ref(null)
  const setCurrentTable = (table) => {
    currentTable.value = table
  }

  return {currentTable, setCurrentTable}
})
