<script setup>
import { useLangStore } from '@/stores/lang'
import { RouterLink } from 'vue-router'
import XButton from '../ui/XButton.vue'

const langStore = useLangStore()

const { category, withImage } = defineProps({
  category: {
    type: Object,
    required: true
  },
  withImage: {
    type: Boolean
  }
})
</script>

<template>
  <RouterLink :to="`/order/${$route.params.orderId}/menu/${category.id}`">
    <div
      v-if="withImage"
      class="relative flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden select-none cursor-pointer"
    >
      <img :src="category.image" alt="category" class="w-full h-full object-cover" />
      <h1
        class="absolute inset-x-0 bottom-0 p-2 text-xs font-bold text-center bg-black bg-opacity-50 text-white md:text-sm lg:text-base"
      >
        {{ langStore.getTextLang(category, 'name', 'Category #X') }}
      </h1>
    </div>
    <XButton v-else fullWidth size="sm" variant="theme">
      {{ langStore.getTextLang(category, 'name', 'Category #X') }}
    </XButton>
  </RouterLink>
</template>
