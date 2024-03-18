<script setup>
import { getItems } from '../../utils/fetch'
import { API_ENDPOINT } from '@/utils/constants'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const { emit } = defineEmits(['edit', 'delete'])

let editingItem = null

const edit = () => {
  editingItem = { ...props.item }
}

const deleteItem = () => {
  emit('delete', props.item.id)
}

const closeModal = () => {
  editingItem = null
}

const saveChanges = () => {
  emit('edit', editingItem)
  closeModal()
}

const loadItems = async () => {
  try {
    const items = await getItems(`${API_ENDPOINT}/items`)
    console.log(items)
  } catch (error) {
    console.error('Error:', error)
  }
}

loadItems()
</script>

<template>
  <div class="bg-red-300 p-4 mb-4">
    <div>
      <div class="text-lg font-semibold">ID: {{ item.id }}</div>
      <div class="text-lg">Name: {{ item.name }}</div>
      <div class="text-lg">Price: {{ item.price }}</div>
      <div class="text-lg">Stock: {{ item.stock }}</div>
      <div class="text-lg">Category ID: {{ item.categoryId }}</div>

      <div class="mt-4">
        <button @click="edit" class="text-sm text-purple-600 hover:text-purple-400 mr-2">
          Edit
        </button>
        <button @click="deleteItem" class="text-sm text-red-600 hover:text-red-400">Delete</button>
      </div>

      <div v-if="editingItem" class="modal">
        <div class="modal-content">
          <span @click="closeModal" class="close">&times;</span>

          <input
            v-model="editingItem.name"
            type="text"
            placeholder="Name"
            class="border border-gray-300 p-2 mb-2"
          />
          <input
            v-model="editingItem.price"
            type="number"
            placeholder="Price"
            class="border border-gray-300 p-2 mb-2"
          />
          <input
            v-model="editingItem.stock"
            type="number"
            placeholder="Stock"
            class="border border-gray-300 p-2 mb-2"
          />

          <button
            @click="saveChanges"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
