<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../product/ProductCard.vue'
import { getItems, postItem, putItem } from '../../utils/fetch'

const items = ref([])
const showEditModal = ref(false)
const tempEditedItem = ref(null)

const showAddModal = ref(false)
const tempNewItem = ref({
  name: { th: '', en: '' },
  price: 0,
  stock: 0,
  categoryId: 0,
  image: '',
  id: 0 
})

const openAddModal = () => {
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
}

const isAddFormValid = computed(() => {
  return (
    tempNewItem.value.name.th.trim() !== '' &&
    tempNewItem.value.name.en.trim() !== '' &&
    tempNewItem.value.price > 0 &&
    tempNewItem.value.stock >= 0 &&
    tempNewItem.value.categoryId > 0 &&
    tempNewItem.value.image.trim() !== ''
  )
})

const categorizedItems = computed(() => {
  const categorized = {}
  items.value.forEach((item) => {
    if (!categorized[item.categoryId]) {
      categorized[item.categoryId] = []
    }
    categorized[item.categoryId].push(item)
  })
  return categorized
})

const addProduct = async () => {
  try {
    const latestItemId = items.value.reduce((maxId, item) => Math.max(maxId, parseInt(item.id)), 0)
    tempNewItem.value.id = String(latestItemId + 1)

    const newItem = await postItem(`${import.meta.env.VITE_API_ENDPOINT}/items`, tempNewItem.value)
    if (newItem) {
      items.value.push(newItem)
      closeAddModal()
    }
  } catch (error) {
    console.error('Error adding product:', error)
  }
}

const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/items/${itemId}`)
    if (!response.ok) {
      throw new Error('Item not found')
    }

    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/items/${itemId}`, {
      method: 'DELETE'
    })

    items.value = items.value.filter((item) => item.id !== itemId)
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const openEditModal = (item) => {
  tempEditedItem.value = { ...item, name: { ...item.name } }
  showEditModal.value = true
}

const closeModal = () => {
  showEditModal.value = false
}

const saveChanges = async () => {
  const editItem = await putItem(
    `${import.meta.env.VITE_API_ENDPOINT}/items`,
    tempEditedItem.value.id,
    tempEditedItem.value
  )
  if (editItem) {
    const index = items.value.findIndex((item) => item.id === editItem.id)
    if (index !== -1) {
      items.value[index] = { ...editItem }
    }
    closeModal()
  }
}

const loadItems = async () => {
  try {
    const response = await getItems(`${import.meta.env.VITE_API_ENDPOINT}/items`)
    items.value = response
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

loadItems()
</script>
<template>
  <div>
    <!-- Product Management -->
    <div class="bg-gray-200 p-4">
      <div class="flex justify-center">
        <div class="bg-theme-500 text-white w-3/4 p-20 m-10 mb-24 text-center">
          <h1 class="text-7xl font-bold">Product Management</h1>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          v-for="(categoryItems, categoryId) in categorizedItems"
          :key="categoryId"
          class="bg-gray-200"
        >
          <div class="text-3xl font-semibold tracking-wide flex justify-between items-center">
            <span>Category ID: {{ categoryId }}</span>
            <button
              @click="openAddModal"
              class="text-white text-2xl bg-green-500 hover:bg-green-600 rounded-full px-4 py-2"
            >
              Add Product
            </button>
          </div>
          <hr class="border-gray-400 my-2" />
          <div class="flex flex-wrap">
            <div v-for="(item, index) in categoryItems" :key="index" class="w-1/4">
              <ProductCard
                :item="item"
                :name="item.name"
                @edit="openEditModal"
                @delete="() => deleteItem(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div
      v-if="showAddModal"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-8 rounded shadow-md relative w-1/3">
        <button
          @click="closeAddModal"
          class="absolute top-3 right-3 p-2 cursor-pointer text-black hover:text-gray-600 transition-colors duration-300 rounded-full bg-gray-300 shadow-md"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 class="text-2xl font-semibold mb-4">Add Product</h2>
        <div class="mb-4">
          <label for="name_th" class="text-sm font-semibold">Name TH :</label>
          <input
            v-model="tempNewItem.name.th"
            id="name_th"
            type="text"
            placeholder="Name (Thai)"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="name_en" class="text-sm font-semibold">Name ENG :</label>
          <input
            v-model="tempNewItem.name.en"
            id="name_en"
            type="text"
            placeholder="Name (English)"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="text-sm font-semibold">Price:</label>
          <input
            v-model="tempNewItem.price"
            id="price"
            type="number"
            placeholder="Price"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="stock" class="text-sm font-semibold">Stock:</label>
          <input
            v-model="tempNewItem.stock"
            id="stock"
            type="number"
            placeholder="Stock"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="categoryId" class="text-sm font-semibold">Category ID:</label>
          <input
            v-model="tempNewItem.categoryId"
            id="categoryId"
            type="number"
            placeholder="Category ID"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="image" class="text-sm font-semibold">Image URL:</label>
          <input
            v-model="tempNewItem.image"
            id="image"
            type="text"
            placeholder="Image URL"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          @click="addProduct"
          :disabled="!isAddFormValid"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
    <!-- Edit Product Modal -->
    <div
      v-if="showEditModal"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-8 rounded shadow-md relative w-1/3">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 p-2 cursor-pointer text-black hover:text-gray-600 transition-colors duration-300 rounded-full bg-gray-300 shadow-md"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 class="text-2xl font-semibold mb-4">Edit Item {{ tempEditedItem.id }}</h2>
        <div class="mb-4">
          <label for="name_th" class="text-sm font-semibold">Name TH :</label>
          <input
            v-model="tempEditedItem.name.th"
            id="name_th"
            type="text"
            placeholder="Name (Thai)"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="name_en" class="text-sm font-semibold">Name ENG :</label>
          <input
            v-model="tempEditedItem.name.en"
            id="name_en"
            type="text"
            placeholder="Name (
              English)"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="text-sm font-semibold">Price:</label>
          <input
            v-model="tempEditedItem.price"
            id="price"
            type="number"
            placeholder="Price"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="stock" class="text-sm font-semibold">Stock:</label>
          <input
            v-model="tempEditedItem.stock"
            id="stock"
            type="number"
            placeholder="Stock"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="categoryId" class="text-sm font-semibold">Category ID:</label>
          <input
            v-model="tempEditedItem.categoryId"
            id="categoryId"
            type="number"
            placeholder="Category ID"
            class="border border-gray-300 p-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="image" class="text-sm font-semibold">Image URL:</label>
          <input
            v-model="tempEditedItem.image"
            id="image"
            type="text"
            placeholder="Image URL"
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
</template>

<style scoped></style>
