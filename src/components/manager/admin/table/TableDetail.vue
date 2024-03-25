<script setup>
import { ref } from 'vue'
import XModal from '@/components/ui/XModal.vue'
import TableButtonManager from '@/components/manager/admin/table/TableButtonManager.vue'

const props = defineProps({
  table: {
    type: Object,
    required: true
  },
  name: {
    type: Object
  }
})

const isEditing = ref(false)
const editedTable = ref({})
const isDetailsOpen = ref(false)
const showDeleteModal = ref(false)

const emit = defineEmits(['save', 'delete'])

const editItem = () => {
  editedTable.value = { ...props.table, name: { ...props.name } }
  toggleEditing()
}

const saveItem = async () => {
  emit('save', editedTable.value)
  toggleEditing()
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
const toggleEditing = () => {
  if (isEditing.value) {
    editedTable.value = { ...props.table }
  }
  isEditing.value = !isEditing.value
}
</script>

<template>
  <div class="flex flex-col justify-center w-full my-1">
    <TableButtonManager @click="toggleDetails">
      <p>{{ name.en }} ({{ name.th }})</p>
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
    </TableButtonManager>

    <!-- Details -->
    <div v-show="isDetailsOpen" class="w-full">
      <div class="flex justify-center bg-theme-300 shadow-lg">
        <div class="py-2 px-4 m-2">
          <div
            class="text-lg md:text-2xl lg:text-4xl font-bold border-b-2 border-gray-300 text-gray-800"
          >
            Details of {{ name.en }}
          </div>

          <div v-if="!isEditing">
            <div class="text-gray-700 font-semibold capitalize text-base md:text-lg lg:text-2xl">
              Name TH : {{ name.th }}
            </div>
            <div class="text-gray-700 font-semibold capitalize text-base md:text-lg lg:text-2xl">
              Name ENG : {{ name.en }}
            </div>
            <div class="text-gray-700 font-semibold capitalize text-base md:text-lg lg:text-2xl">
              Size : {{ table.defaultSize }}
            </div>
          </div>

          <div v-else>
            <div class="text-gray-700 font-semibold capitalize text-base md:text-lg lg:text-2xl">
              <label for="name_th">Name TH :</label>
              <input
                v-model="editedTable.name.th"
                id="name_th"
                type="text"
                class="border border-gray-300 px-2 py-1 w-full text-xl"
              />
            </div>
            <div class="text-gray-700 font-semibold capitalize text-base md:text-lg lg:text-2xl">
              <label for="name_en">Name ENG :</label>
              <input
                v-model="editedTable.name.en"
                id="name_en"
                type="text"
                class="border border-gray-300 px-2 py-1 w-full text-xl"
              />
            </div>
            <div class="text-gray-700 font-semibold capitalize text-base md:text-lg lg:text-2xl">
              <label for="size">Size :</label>
              <input
                v-model="editedTable.defaultSize"
                id="size"
                type="number"
                class="border border-gray-300 px-2 py-1 w-full text-xl"
              />
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button
              v-if="!isEditing"
              @click="editItem"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 w-full md:w-32"
            >
              Edit
            </button>
            <button
              v-else
              @click="saveItem"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2 w-full md:w-32"
            >
              Save
            </button>
            <button
              v-if="!isEditing"
              @click="confirmDelete"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2 w-full md:w-32"
            >
              Delete
            </button>
            <button
              v-if="isEditing"
              @click="toggleEditing"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full md:w-32"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <XModal :show="showDeleteModal" title="Confirm Delete" @close="cancelDelete">
      <p>Are you sure you want to delete this table?</p>
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
    </XModal>
  </div>
</template>

<style scoped></style>
