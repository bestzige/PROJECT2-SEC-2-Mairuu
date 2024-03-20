<template>
    <div class="flex justify-center">
      <div class="w-3/4 bg-gray-200 py-2 text-center text-lg">
        Table {{ table.id }}
      </div>
   
      <div class="relative inline-block ml-2">
        
        <button @click="toggleDropdown"
                class="text-sm text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400">
          <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
    
        <div v-if="isDropdownOpen" class="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg max-w-screen-lg max-h-screen overflow-y-auto">
          <div class="py-2 px-4">
           
            <div class="text-gray-700 block mb-2 text-sm capitalize">ID: {{ table.id }}</div>
            <div class="text-gray-700 block mb-2 text-sm capitalize">Name TH: {{ table.name.th }}</div>
            <div class="text-gray-700 block mb-2 text-sm capitalize">Name ENG: {{ table.name.en }}</div>
            <div class="text-gray-700 block mb-2 text-sm capitalize">Size: {{ table.defaultSize }}</div>
            <div class="text-gray-700 block mb-2 text-sm capitalize">Status: {{ table.status }}</div>
            
            <div class="flex justify-end mt-2">
              <button @click="editItem" class="text-sm text-purple-600 hover:text-purple-400 mr-2">Edit</button>
              <button @click="deleteItem" class="text-sm text-red-600 hover:text-red-400">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  

  const props = defineProps({
    table: {
      type: Object,
      required: true
    }
  })
  
  
  const isDropdownOpen = ref(false)
  
 
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }
  

  const emit = defineEmits(['edit', 'delete'])
  

  const editItem = () => {
    emit('edit', props.table)
  }
  
  
  const deleteItem = () => {
    emit('delete', props.table.id)
  }
  </script>
  
  <style scoped>
 
  /* [aria-expanded="true"] .dropdown-content {
    display: block;
  } */
  </style>
  