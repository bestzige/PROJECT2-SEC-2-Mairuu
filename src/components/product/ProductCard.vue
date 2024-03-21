<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  name: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const editItem = () => {
  emit('edit', { ...props.item, name: { ...props.name } })
}

const deleteConfirmed = () => {
  emit('delete', props.item.id)
  showDeleteModal.value = false
}

const showDeleteModal = ref(false)

const confirmDelete = () => {
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
}
</script>

<template>
  <div class="bg-red-300 p-4 m-10">
    <div>
      <div class="text-lg"><img :src="item.image" alt="" /></div>
      <div class="text-lg">Name TH : {{ name.th }}</div>
      <div class="text-lg">Name ENG : {{ name.en }}</div>

      <div class="mt-4">
        <button
          @click="editItem"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Edit
        </button>
        <button
          @click="confirmDelete"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-8 rounded shadow-md relative w-1/3">
        <h2 class="text-2xl font-semibold mb-4">Confirm Delete</h2>
        <p class="mb-4">Are you sure you want to delete this item?</p>
        <div class="flex justify-end">
          <button
            @click="cancelDelete"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="deleteConfirmed"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
