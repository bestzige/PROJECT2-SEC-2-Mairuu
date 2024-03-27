<script setup>
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

defineEmits(['addToCart'])
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
    @click="$emit('addToCart', item)"
    class="relative flex flex-col items-center justify-center rounded-lg overflow-hidden select-none cursor-pointer border-2 border-black hover:border-red-500"
  >
    <div class="absolute top-0 right-0 p-2 text-lg font-bold text-red-500">{{ item.price }} ฿</div>
    <img :src="item.image" alt="category" class="w-80 h-80 object-cover" />
    <h1
      class="absolute inset-x-0 bottom-0 p-2 text-xs font-bold text-center bg-black bg-opacity-50 text-white md:text-sm lg:text-base"
    >
      {{ langStore.getTextLang(item, 'name', 'Item #X') }}
    </h1>
  </div>
</template>
