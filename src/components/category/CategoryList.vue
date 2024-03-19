<script setup>
import CategoryButton from '@/components/category/CategoryButton.vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryStore = useCategoryStore()

defineProps({
  withImage: {
    type: Boolean
  }
})

const categories = ref([])

const refetchCategories = async () => {
  categories.value = await categoryStore.getPublishedCategories()
}

onMounted(async () => {
  await refetchCategories()
})

watch(
  () => route.params.orderId,
  async () => {
    await refetchCategories()
  }
)
</script>

<template>
  <CategoryButton
    v-for="category in categories"
    :key="category.id"
    :category="category"
    :withImage="withImage"
  />
</template>
