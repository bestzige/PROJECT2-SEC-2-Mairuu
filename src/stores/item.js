import { API_ENDPOINT } from '@/utils/constants'
import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', () => {
  const getItems = async (categoryId) => {
    const data = await fetch.getItems(`${API_ENDPOINT}/items?categoryId=${categoryId}`)
    return data.items
  }

  const getPublishedItems = async (categoryId) => {
    const data = await fetch.getItems(
      `${API_ENDPOINT}/items?categoryId=${categoryId}&published=true`
    )
    return data
  }

  return {
    getItems,
    getPublishedItems
  }
})
