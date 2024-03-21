import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useOrderStore } from './order'
import * as fetch from '../utils/fetch'

export const useTableStore = defineStore('table', () => {
  const currentTable = ref(null)

  const orderStore = useOrderStore()

  const setCurrentTable = (table) => {
    currentTable.value = table
  }
  const getCurrentTable = () => {
    return currentTable.value
  }
  const getAllTables = async () => {
    const data = await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/tables`)
    return data
  }
  const getAvailableTables = async () => {
    const allTables = await getAllTables()
    const openOrders = await orderStore.getOpenOrders()
    const openOrderTableMap = openOrders.map((order) => order.tableId)
    return allTables.filter((table) => !openOrderTableMap.includes(table.id))
  }

  return { currentTable, setCurrentTable, getCurrentTable, getAllTables, getAvailableTables }
})
