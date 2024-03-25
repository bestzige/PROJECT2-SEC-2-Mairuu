import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'
import { useUiStore } from '@/stores/ui'

export const useItemStore = defineStore('item', () => {
  const uiStore = useUiStore()

  const getAllItems = async (categoryId) => {
    const data = await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/items?categoryId=${categoryId}&_embed=category`
    )
    return data.items
  }

  const getPublishedItems = async (categoryId) => {
    const data = await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/items?categoryId=${categoryId}&published=true`
    )
    return data
  }

  const deleteItem = async (itemId) => {
    const data = await fetch.deleteItem(`${import.meta.env.VITE_API_ENDPOINT}/items`, itemId)
    if (!data) {
      return uiStore.addToast({ message: 'Item not found', type: 'error' })
    }

    uiStore.addToast({ message: 'Item deleted', type: 'success' })
    return data
  }

  const saveItem = async (item) => {
    if (item.id) {
      const data = await fetch.putItem(
        `${import.meta.env.VITE_API_ENDPOINT}/items`,
        item.id,
        item
      )
      if (!data) {
        return uiStore.addToast({ message: 'Item not found', type: 'error' })
      }

      uiStore.addToast({ message: 'Item updated', type: 'success' })
      return data
    } else {
      const data = await fetch.postItem(
        `${import.meta.env.VITE_API_ENDPOINT}/items`,
        item
      )
      if (!data) {
        return uiStore.addToast({ message: 'Create item failed', type: 'error' })
      }

      uiStore.addToast({ message: 'Item created', type: 'success' })
      return data
    }
  }

  return {
    getAllItems,
    getPublishedItems,
    deleteItem,
    saveItem
  }
})
