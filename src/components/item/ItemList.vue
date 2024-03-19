<script setup>
import ItemButton from '@/components/item/ItemButton.vue'
import { useCategoryStore } from '@/stores/category'
import { useItemStore } from '@/stores/item'
import { useLangStore } from '@/stores/lang'
import { useOrderStore } from '@/stores/order'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const langStore = useLangStore()
const orderStore = useOrderStore()
const categoryStore = useCategoryStore()
const itemStore = useItemStore()

const category = ref(null)

const items = ref([])

const refetchItems = async (categoryId) => {
  items.value = await itemStore.getPublishedItems(categoryId)
  category.value = await categoryStore.getCategory(categoryId)
}

onMounted(async () => {
  await refetchItems(route.params.categoryId)
})

watch(
  () => route.params.categoryId,
  async (newCategoryId) => {
    await refetchItems(newCategoryId)
  }
)
</script>

<template>
  <div>
    <h1 class="text-lg font-bold mb-4">
      {{ langStore.getTextLang(category, 'name', 'Category Name') }}
      <span class="text-sm text-gray-500">({{ items.length }} items)</span>
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 mb-4">
      <ItemButton
        v-for="item in items"
        :key="item.id"
        :item="item"
        @addToCart="() => orderStore.addToCart(item)"
      />
    </div>
  </div>
</template>
