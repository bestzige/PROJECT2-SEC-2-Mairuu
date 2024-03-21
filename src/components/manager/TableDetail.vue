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
          <div class="items-center justify-start">Table {{ table.id }} Details</div>

          <div class="items-center justify-end">
            <svg
              class="w-4 h-4 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="7"
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
          <div class="py-2 px-4">
            <div class="text-gray-700 block mb-4 mt-4 text-2xl capitalize">ID: {{ table.id }}</div>
            <div class="text-gray-700 block mb-4 text-2xl capitalize">
              <div class="flex">
                Name TH:
                <input
                  :value="table.name.th"
                  id="name_th"
                  type="text"
                  placeholder="Name (Thai)"
                  class="border border-gray-300 px-1 w-auto"
                />
              </div>
            </div>

            <div class="text-gray-700 block mb-4 text-2xl capitalize">
              <div class="flex">
                Name ENG:
                <input
                  :value="table.name.en"
                  id="name_th"
                  type="text"
                  placeholder="Name (Thai)"
                  class="border border-gray-300 px-1 w-auto"
                />
              </div>
            </div>
            <div class="text-gray-700 block mb-4 text-2xl capitalize">
              <div class="flex">
                Size :
                <input
                  :value="table.defaultSize"
                  id="name_th"
                  type="text"
                  placeholder="Name (Thai)"
                  class="border border-gray-300 px-1 w-auto"
                />
              </div>
            </div>
            <div class="text-gray-700 block mb-4 text-2xl capitalize">
              <div class="flex">
                Status:
                <input
                  :value="table.status"
                  id="name_th"
                  type="text"
                  placeholder="Name (Thai)"
                  class="border border-gray-300 px-1 w-auto"
                />
              </div>
            </div>

            <div class="flex justify-end mt-2">
              <button @click="editItem" class="text-3xl text-purple-600 hover:text-purple-400 mr-2">
                Edit
              </button>
              <button @click="deleteItem" class="text-3xl text-red-600 hover:text-red-400">
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
