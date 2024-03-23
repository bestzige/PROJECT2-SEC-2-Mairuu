<script setup>
import { ref } from 'vue'
import { putItem } from '../../utils/fetch'

const props = defineProps({
  table: {
    type: Object,
    required: true
  }
})

const isEditing = ref(false)
const editedTable = ref({})
const isDetailsOpen = ref(false)
const showDeleteModal = ref(false)

const toggleEditing = () => {
  isEditing.value = !isEditing.value
}

const emit = defineEmits(['edit', 'save', 'delete'])

const editItem = () => {
  editedTable.value = { ...props.table }
  toggleEditing()
}

const saveItem = async () => {
  try {
    await putItem(`${import.meta.env.VITE_API_ENDPOINT}/tables`, editedTable.value)
    emit('save', editedTable.value)
    toggleEditing()
  } catch (error) {
    console.error('Error:', error)
  }
}

const deleteConfirmed = () => {
  emit('delete', props.table.id)
  showDeleteModal.value = false
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

const toggleDetails = () => {
  isDetailsOpen.value = !isDetailsOpen.value
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
          class="py-4 px-4 bg-theme-500 text-center text-3xl flex items-center justify-between text-white"
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
      <div v-show="isDetailsOpen" class="ml-auto mr-auto flex justify-center items-center">
        <div
          class="py-2 px-4 bg-theme-300 border border-gray-200 shadow-lg max-h-screen overflow-y-auto w-full"
        >
          <div class="py-2 px-4 m-2">
            <div class="text-gray-700 block mb-3 text-2xl font-bold capitalize border-b-2">
              DETAILS OF TABLE {{ table.id }}
            </div>
            <div v-if="!isEditing">
              <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                Name TH : {{ table.name.th }}
              </div>
              <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                Name ENG : {{ table.name.en }}
              </div>
              <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                Size : {{ table.defaultSize }}
              </div>
              <!-- <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                Status : {{ table.status }}
              </div> -->
            </div>
            <div v-else>
              <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                <label for="name_th">Name TH :</label>
                <input
                  v-model="editedTable.name.th"
                  id="name_th"
                  type="text"
                  class="border border-gray-300 px-2 py-1 w-full text-xl"
                />
              </div>
              <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                <label for="name_en">Name ENG :</label>
                <input
                  v-model="editedTable.name.en"
                  id="name_en"
                  type="text"
                  class="border border-gray-300 px-2 py-1 w-full text-xl"
                />
              </div>
              <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                <label for="size">Size :</label>
                <input
                  v-model="editedTable.defaultSize"
                  id="size"
                  type="text"
                  class="border border-gray-300 px-2 py-1 w-full text-xl"
                />
              </div>
              <!-- <div class="text-gray-700 block mb-2 text-2xl font-bold capitalize">
                <label for="status">Status :</label>
                <input
                  v-model="editedTable.status"
                  id="status"
                  type="text"
                  class="border border-gray-300 px-2 py-1 w-full text-xl"
                />
              </div> -->
            </div>
            <div class="flex justify-end mt-8">
              <button
                v-if="!isEditing"
                @click="editItem"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 w-32"
              >
                Edit
              </button>
              <button
                v-else
                @click="saveItem"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2 w-32"
              >
                Save
              </button>
              <button
                @click="confirmDelete"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-32"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-8 rounded shadow-md relative w-1/3">
          <h2 class="text-2xl font-semibold mb-4">Confirm Delete</h2>
          <p class="mb-4">Are you sure you want to delete this table?</p>
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
  </div>
</template>

<style scoped></style>
