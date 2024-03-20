<script setup>
import {  defineProps } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const editItem = () => {
  emit('edit', { ...props.item })
}

const deleteItem = () => {
  emit('delete', props.item.id)
}
</script>

<template>
  <div class="bg-red-300 p-4 m-10">
    <div>
      <div class="text-lg font-semibold">ID: {{ item.id }}</div>
      <div class="text-lg">Name: {{ item.name.th }}</div>
      <!-- <div class="text-lg">Price: {{ item.price }}</div>
      <div class="text-lg">Stock: {{ item.stock }}</div>
      <div class="text-lg">Category ID: {{ item.categoryId }}</div> -->

      <div class="mt-4">
        <button @click="editItem" class="text-sm text-purple-600 hover:text-purple-400 mr-2">
          Edit
        </button>
        <button @click="deleteItem" class="text-sm text-red-600 hover:text-red-400">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>