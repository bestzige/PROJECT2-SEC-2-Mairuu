<script setup>
import { ref, computed } from 'vue'
import BaseCard from './BaseCard.vue'

import { getItems } from '../../utils/fetch'
import { API_ENDPOINT } from '@/utils/constants'

const items = ref([])
const showEditModal = ref(false)
const selectedItem = ref(null)

const openEditModal = (item) => {
  selectedItem.value = item
  showEditModal.value = true
}

const deleteItem = (itemId) => {
  console.log('Deleting item with ID:', itemId)
}

const loadItems = async () => {
  try {
    const response = await getItems(`${API_ENDPOINT}/items`)
    items.value = response
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

const categorizedItems = computed(() => {
  const categorized = {}
  items.value.forEach((item) => {
    if (!categorized[item.categoryId]) {
      categorized[item.categoryId] = []
    }
    categorized[item.categoryId].push(item)
  })
  return categorized
})

loadItems()
</script>

<template>
  <div>
    <div class="bg-gray-200 p-4">
      <div class="flex justify-center">
        <div class="bg-red-700 text-white w-3/4 p-20 m-10 text-center">
          <h1 class="text-7xl font-bold">Product Management</h1>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          v-for="(categoryItems, categoryId) in categorizedItems"
          :key="categoryId"
          class="bg-gray-200"
        >
          <div class="text-3xl font-semibold tracking-wide">Category ID: {{ categoryId }}</div>
          <hr class="border-gray-400 my-2" />
          <div class="flex flex-wrap">
            <div v-for="(item, index) in categoryItems" :key="index" class="w-1/4">
              <BaseCard :item="item" @edit="openEditModal(item)" @delete="deleteItem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
