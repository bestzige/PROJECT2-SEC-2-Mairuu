<script setup>
import { ref, computed } from 'vue'
import BaseCard from './BaseCard.vue'

import { getItems, putItem } from '../../utils/fetch'
import { API_ENDPOINT } from '@/utils/constants'

const items = ref([])
const showEditModal = ref(false)
const editedItem = ref(null)
const tempEditedItem = ref(null)

const openEditModal = (item) => {
  editedItem.value = { ...item }
  tempEditedItem.value = { ...item }
  showEditModal.value = true
}

const deleteItem = async (itemId) => {
  try {
    await fetch(`${API_ENDPOINT}/items/${itemId}`, {
      method: 'DELETE'
    })
    items.value = items.value.filter((item) => item.id !== itemId)
  } catch (error) {
    console.error('Error deleting item:', error)
  }
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

const closeModal = () => {
  showEditModal.value = false
}

const saveChanges = async () => {
  try {
    await putItem(`${API_ENDPOINT}/items`, editedItem.value.id, editedItem.value)
    const index = items.value.findIndex((item) => item.id === editedItem.value.id)
    if (index !== -1) {
      items.value[index] = { ...editedItem.value }
    }
    closeModal()
  } catch (error) {
    console.error('Error updating item:', error)
  }
}

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
              <BaseCard :item="item" @edit="openEditModal(item)" @delete="deleteItem(item.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showEditModal"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-8 rounded shadow-md relative w-1/3">
        <button @click="closeModal" class="absolute top-0 right-0 p-2 cursor-pointer text-black">
          X
        </button>
        <h2 class="text-2xl font-semibold mb-4">Edit Item</h2>
        <div class="mb-4">
          <label for="name" class="text-sm font-semibold">Name:</label>
          <input
            v-model="tempEditedItem.name.th"
            id="name"
            type="text"
            placeholder="Name"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="text-sm font-semibold">Price:</label>
          <input
            v-model="tempEditedItem.price"
            id="price"
            type="number"
            placeholder="Price"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="stock" class="text-sm font-semibold">Stock:</label>
          <input
            v-model="tempEditedItem.stock"
            id="stock"
            type="number"
            placeholder="Stock"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="categoryId" class="text-sm font-semibold">Category ID:</label>
          <input
            v-model="tempEditedItem.categoryId"
            id="categoryId"
            type="number"
            placeholder="Category ID"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          @click="saveChanges"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>