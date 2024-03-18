<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const { emit } = defineEmits(['edit', 'delete'])
const editingItem = ref(null)

const edit = () => {
  editingItem.value = { ...props.item }
}

const deleteItem = () => {
  emit('delete', props.item.id)
}

const closeModal = () => {
  editingItem.value = null
}

const saveChanges = () => {
  emit('edit', editingItem.value)
  closeModal()
}
</script>

<template>
  <div class="bg-red-300 p-4 m-10">
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

      <div
        v-if="editingItem !== null"
        class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-8 rounded shadow-md relative w-1/3">
          <button @click="closeModal" class="absolute top-0 right-0 p-2 cursor-pointer text-black">
            &times;
          </button>

          <div class="mb-4">
            <label for="name" class="text-sm font-semibold">Name:</label>
            <input
              v-model="editingItem.name.th"
              id="name"
              type="text"
              placeholder="Name"
              class="border border-gray-300 p-2 w-full"
            />
          </div>

          <div class="mb-4">
            <label for="price" class="text-sm font-semibold">Price:</label>
            <input
              v-model="editingItem.price"
              id="price"
              type="int"
              placeholder="Price"
              class="border border-gray-300 p-2 w-full"
            />
          </div>

          <div class="mb-4">
            <label for="stock" class="text-sm font-semibold">Stock:</label>
            <input
              v-model="editingItem.stock"
              id="stock"
              type="int"
              placeholder="Stock"
              class="border border-gray-300 p-2 w-full"
            />
          </div>

          <div class="mb-4">
            <label for="categoryId" class="text-sm font-semibold">Category ID:</label>
            <input
              v-model="editingItem.categoryId"
              id="categoryId"
              type="int"
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
  </div>
</template>

<style scoped></style>
