<script setup>
import { ref, computed, onMounted } from 'vue'
import CategoryCard from '@/components/manager/admin/product/CategoryCard.vue'
import ManagerHeader from '@/components/manager/ManagerHeader.vue'
import { useItemStore } from '@/stores/item'
import { stringValidator } from '@/utils/validators'
import { useCategoryStore } from '@/stores/category'
import XModal from '@/components/ui/XModal.vue'

const categoryStore = useCategoryStore()
const itemStore = useItemStore()

const categories = ref([])

const isManagerModalOpen = ref(false)

const tempItem = ref({
  name: { th: '', en: '' },
  price: 0,
  categoryId: 0,
  image: '',
  published: 'true'
})

const setDefaultItem = () => {
  tempItem.value = {
    name: { th: '', en: '' },
    price: 0,
    categoryId: 0,
    image: '',
    published: 'true'
  }
}

const isAddFormValid = computed(() => {
  return (
    stringValidator(tempItem.value.name.th) &&
    stringValidator(tempItem.value.name.en) &&
    stringValidator(tempItem.value.image) &&
    tempItem.value.price >= 0 &&
    tempItem.value.categoryId > 0
  )
})

const deleteItem = async (itemId) => {
  const deleteItem = await itemStore.deleteItem(itemId)
  if (deleteItem) {
    categories.value = categories.value.map((category) => {
      category.items = category.items.filter((item) => item.id !== itemId)
      return category
    })
  }
}

const saveItemHandler = async (item) => {
  const data = item.id
    ? {
        ...item,
        published: item.published ? 'true' : 'false'
      }
    : tempItem.value
  const saveItem = await itemStore.saveItem(data)

  if (item.id) {
    categories.value = categories.value.map((category) => {
      const items = category.items.filter((i) => i.id !== item.id)
      if (category.id === item.categoryId) {
        items.push(saveItem)
      }
      return { ...category, items }
    })
  } else {
    const category = categories.value.find((c) => c.id === tempItem.value.categoryId)
    category.items.push(saveItem)
  }

  setDefaultItem()
  isManagerModalOpen.value = false
}

const addItem = (category) => {
  if (!category) return
  setDefaultItem()
  tempItem.value.categoryId = category.id
  isManagerModalOpen.value = true
}

const editItem = (item) => {
  if (!item) return
  tempItem.value = {
    ...item,
    published: item.published === 'true'
  }
  isManagerModalOpen.value = true
}

const loadData = async () => {
  categories.value = await categoryStore.getgetCategoriesWithItems()
}

onMounted(async () => {
  setDefaultItem()
  await loadData()
})
</script>

<template>
  <div class="flex flex-col w-full px-5 md:px-10 lg:px-20">
    <ManagerHeader>Product Management</ManagerHeader>
    <div class="flex flex-col gap-4">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @add="addItem"
        @edit="editItem"
        @delete="deleteItem"
      />
    </div>

    <XModal
      :show="isManagerModalOpen"
      :title="tempItem.id ? 'Edit Item' : 'Add Item'"
      size="lg"
      @close="isManagerModalOpen = false"
    >
      <div class="flex flex-col gap-4">
        <div v-if="tempItem.image" class="w-full">
          <img :src="tempItem.image" alt="item" class="w-full object-cover rounded-lg h-64" />
        </div>
        <div>
          <label for="name-th" class="text-sm font-semibold">Name (TH)</label>
          <input
            v-model="tempItem.name.th"
            type="text"
            placeholder="Name (TH)"
            class="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label for="name-en" class="text-sm font-semibold">Name (EN)</label>
          <input
            v-model="tempItem.name.en"
            type="text"
            placeholder="Name (EN)"
            class="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label for="price" class="text-sm font-semibold">Price ฿</label>
          <input
            v-model.number="tempItem.price"
            type="number"
            placeholder="Price"
            class="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>
        <div v-if="tempItem.id">
          <label for="category" class="text-sm font-semibold">Category</label>
          <select
            v-model="tempItem.categoryId"
            class="border border-gray-300 p-2 w-full rounded-lg"
          >
            <option disabled value="0">Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name.en }}
            </option>
          </select>
        </div>

        <div>
          <label for="image" class="text-sm font-semibold">Image URL</label>
          <input
            v-model="tempItem.image"
            type="text"
            placeholder="Image URL"
            class="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>

        <div class="flex items-center">
          <input v-model="tempItem.published" type="checkbox" class="mr-2" />
          <label>Published</label>
        </div>
        <div class="flex justify-end">
          <button
            @click="isManagerModalOpen = false"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="saveItemHandler(tempItem)"
            :disabled="!isAddFormValid"
            class="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-400 disabled:opacity-50"
          >
            {{ tempItem.id ? 'Save' : 'Add' }}
          </button>
        </div>
      </div>
    </XModal>
  </div>
</template>

<style scoped></style>
