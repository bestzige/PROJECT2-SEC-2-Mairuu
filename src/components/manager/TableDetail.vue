<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  table: {
    type: Object,
    required: true
  }
})

const isDetailsOpen = ref(false)

const toggleDetails = () => {
  isDetailsOpen.value = !isDetailsOpen.value
}

const emit = defineEmits(['edit', 'delete'])

const editItem = () => {
  emit('edit', props.table)
}

const deleteItem = () => {
  emit('delete', props.table.id)
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-3/4 my-1">
      <button
        @click="toggleDetails"
        class="text-sm text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 w-full"
      >
        <div
          class="py-4 px-4 bg-theme-500 text-center text-2xl flex items-center justify-between text-white"
        >
          <div class="flex items-center justify-start">Table {{ table.id }}</div>
          <div class="flex items-center justify-end">
            <svg
              class="w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </button>
      <div v-if="isDetailsOpen" class="ml-auto mr-auto flex justify-center items-center">
        <div
          class="py-2 px-4 bg-theme-300 border border-gray-200 shadow-lg max-h-screen overflow-y-auto w-full"
        >
          <div class="py-2 px-4 m-2">
            <div class="text-gray-700 block mb-3 text-xl font-bold capitalize border-b-2">
              DETAILS OF TABLE {{ table.id }}
            </div>
            <div class="text-gray-700 block mb-2 text-lg font-bold capitalize">
              <label for="name_th" class="flex">Name TH :</label>
              <input
                :value="table.name.th"
                id="name_th"
                type="text"
                placeholder="Name (Thai)"
                class="border border-gray-300 px-2 py-1 w-full text-lg"
              />
            </div>
            <div class="text-gray-700 block mb-2 text-lg font-bold capitalize">
              <label for="name_en" class="flex">Name ENG :</label>
              <input
                :value="table.name.en"
                id="name_en"
                type="text"
                placeholder="Name (English)"
                class="border border-gray-300 px-2 py-1 w-full text-lg"
              />
            </div>
            <div class="text-gray-700 block mb-2 text-lg font-bold capitalize">
              <label for="size" class="flex">Size :</label>
              <input
                :value="table.defaultSize"
                id="size"
                type="text"
                placeholder="Size"
                class="border border-gray-300 px-2 py-1 w-full text-lg"
              />
            </div>
            <div class="text-gray-700 block mb-2 text-lg font-bold capitalize">
              <label for="status" class="flex">Status :</label>
              <input
                :value="table.status"
                id="status"
                type="text"
                placeholder="Status"
                class="border border-gray-300 px-2 py-1 w-full text-lg"
              />
            </div>
            <div class="flex justify-end mt-8">
              <button
                @click="editItem"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 w-32"
              >
                Edit
              </button>
              <button
                @click="deleteItem"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-32"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your scoped styles here */
</style>
