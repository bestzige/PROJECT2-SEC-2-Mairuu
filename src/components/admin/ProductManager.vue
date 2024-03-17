<script setup>
import BaseCard from './BaseCard.vue'
import { ref, onMounted } from 'vue'
import { getItems } from '../../utils/fetch'

const items = ref([])

const editItem = (item) => {
  console.log('Edit item:', item)
}

const deleteItem = (itemId) => {
  console.log('Delete item with ID:', itemId)
}

onMounted(async () => {
  try {
    const response = await getItems(`http://localhost:5001/items`)
    items.value = response
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})
</script>

<template>
  <div class="w-full">
    <div>
      <div class="flex justify-end"></div>
      <div>
        <div class="text-3xl font-semibold tracking-wide">Steamed Dim Sum</div>
        <div v-for="(item, index) in items" :key="index">
          <BaseCard :item="item" @edit="editItem" @delete="deleteItem" />
        </div>
      </div>
    </div>
  </div>
  <div class="w-full">
    <div>
      <div class="flex justify-end"></div>
      <div>
        <div class="text-3xl font-semibold tracking-wide">Steamed Dim Sum</div>
        <div v-for="(item, index) in items" :key="index">
          <BaseCard :item="item" @edit="editItem" @delete="deleteItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
