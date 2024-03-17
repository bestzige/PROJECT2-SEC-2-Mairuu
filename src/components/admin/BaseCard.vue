<script setup>
import { defineProps, defineEmits } from 'vue'
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
    const items = await getItems(`${API_ENDPOINT}items`)
    console.log(items)
  } catch (error) {
    console.error('Error:', error)
  }
}

loadItems()
</script>

<template>
  <div>
    <div>ID: {{ item.id }}</div>
    <div>Name: {{ item.name }}</div>
    <div>Price: {{ item.price }}</div>
    <div>Stock: {{ item.stock }}</div>
    <div>Category ID: {{ item.categoryId }}</div>

    <div>
      <button @click="edit" class="text-sm text-purple-600 hover:text-purple-400">Edit</button>
      <button @click="deleteItem" class="text-sm text-red-600 hover:text-red-400">Delete</button>
    </div>

    <div v-if="editingItem" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>

        <input v-model="editingItem.name" type="text" placeholder="Name" />
        <input v-model="editingItem.price" type="number" placeholder="Price" />
        <input v-model="editingItem.stock" type="number" placeholder="Stock" />

        <button @click="saveChanges" class="btn-save">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
