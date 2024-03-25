import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const getCategories = async () => {
    return await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/categories`)
  }

  const getgetCategoriesWithItems = async () => {
    return await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/categories?_embed=items`)
  }

  const getPublishedCategories = async () => {
    return await fetch.getItems(`${import.meta.env.VITE_API_ENDPOINT}/categories?published=true`)
  }

  const getCategory = async (id) => {
    return await fetch.getItem(`${import.meta.env.VITE_API_ENDPOINT}/categories`, id)
  }

  return {
    getCategories,
    getgetCategoriesWithItems,
    getPublishedCategories,
    getCategory
  }
})
