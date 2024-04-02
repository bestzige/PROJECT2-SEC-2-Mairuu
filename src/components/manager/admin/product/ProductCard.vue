<script setup>
import XModal from '@/components/ui/XModal.vue'
import { ref } from 'vue'

defineProps({
  item: {
    type: Object
  }
})

const isDelete = ref(false)
defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="p-4 bg-theme-300 rounded-lg shadow-lg">
    <div>
      <img :src="item.image" alt="item" class="w-full object-cover rounded-lg h-64" />
      <div>
        <p class="text-2xl font-semibold mt-2">{{ item.name.en }}</p>
        <p class="text-lg font-semibold text-gray-600">{{ item.name.th }}</p>
        <p class="text-lg font-semibold mt-2 text-red-500">{{ item.price }}฿</p>
      </div>

      <div>
        <p
          class="text-lg font-semibold mt-2"
          :class="item.published === 'true' ? 'text-green-500' : 'text-red-500'"
        >
          {{ item.published === 'true' ? 'Published' : 'Unpublished' }}
        </p>

        <div class="flex justify-end ml-1 mr-1 mt-3">
          <button
            @click="$emit('edit', item)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 w-36"
          >
            Edit
          </button>
          <button
            @click="isDelete = true"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-36"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <XModal
      :show="isDelete"
      title="Confirm Delete"
      @close="isDelete = false"
      :close-when-click-outside="false"
    >
      <p>Are you sure you want to delete this item?</p>
      <div class="flex justify-end">
        <button
          @click="isDelete = false"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="$emit('delete', item.id)"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </XModal>
  </div>
</template>

<style scoped></style>
