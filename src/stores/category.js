import { API_ENDPOINT } from '@/utils/constants'
import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const getCategories = async () => {
    return await fetch.getItems(`${API_ENDPOINT}/categories`)
  }

  const getPublishedCategories = async () => {
    return await fetch.getItems(`${API_ENDPOINT}/categories?published=true`)
  }

  const getCategory = async (id) => {
    return await fetch.getItem(`${API_ENDPOINT}/categories`, id)
  }

  return {
    getCategories,
    getPublishedCategories,
    getCategory
  }
})
