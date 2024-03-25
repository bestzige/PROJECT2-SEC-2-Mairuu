import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useOrderStore } from './order'
import * as fetch from '../utils/fetch'
import { useUiStore } from './ui'

export const useTableStore = defineStore('table', () => {
  const currentTable = ref(null)

  const uiStore = useUiStore()
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

  const deleteTable = async (tableId) => {
    const data = await fetch.deleteItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, tableId)
    if (!data) {
        return uiStore.addToast({ message: 'Table not found', type: 'error' })
    }
    uiStore.addToast({ message: 'Table deleted', type: 'success' })
    return data
  }

  const saveTable = async (table) => {
    if (table.id) {
      const data = await fetch.putItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table.id, table)
      if (!data) {
        return uiStore.addToast({ message: 'Table not found', type: 'error' })
      }
      uiStore.addToast({ message: 'Table updated', type: 'success' })
      return data
    } else {
      const data = await fetch.postItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, table)
      if (!data) {
        return uiStore.addToast({ message: 'Create table failed', type: 'error' })
      }
      uiStore.addToast({ message: 'Table created', type: 'success' })
      return data
    }
  }

  return { currentTable, setCurrentTable, getCurrentTable, getAllTables, getAvailableTables, deleteTable, saveTable }
})
