<script setup>
import BaseCard from './BaseCard.vue'
import { ref, onMounted, computed } from 'vue'
import { getItems } from '../../utils/fetch'
import { API_ENDPOINT } from '@/utils/constants';

const items = ref([])

const editItem = (item) => {
  console.log('Edit item:', item)
}

const deleteItem = (itemId) => {
  console.log('Delete item with ID:', itemId)
}

onMounted(async () => {
  try {
    const response = await getItems(`${API_ENDPOINT}/items`)
    items.value = response
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})

const categorizedItems = computed(() => {
  const categorized = {}
  items.value.forEach(item => {
    if (!categorized[item.categoryId]) {
      categorized[item.categoryId] = []
    }
    categorized[item.categoryId].push(item)
  })
  return categorized
})
</script>

<template>
  <div>
    <div v-for="(categoryItems, categoryId) in categorizedItems" :key="categoryId" class="bg-gray-200 p-4">
      <div>
        <div class="text-3xl font-semibold tracking-wide">Category ID: {{ categoryId }}</div>
        <div v-for="(item, index) in categoryItems" :key="index">
          <BaseCard :item="item" @edit="editItem" @delete="deleteItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
