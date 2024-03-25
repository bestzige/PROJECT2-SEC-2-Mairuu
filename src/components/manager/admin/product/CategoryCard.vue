<script setup>
import ProductCard from '@/components/manager/admin/product/ProductCard.vue'
defineProps(['category', 'add', 'edit', 'delete'])
</script>

<template>
  <div>
    <div class="flex justify-between items-center my-2 text-lg md:text-xl lg:text-2xl font-bold">
      <span> {{ category.name.en }}</span>
      <button
        @click="$emit('add', category)"
        class="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 text-base md:text-lg lg:text-2xl"
      >
        Add Product
      </button>
    </div>
    <hr class="border-2 border-gray-300 my-2" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <ProductCard
        v-for="item in category.items"
        :key="item.id"
        :item="item"
        :name="item.name"
        @edit="$emit('edit', item)"
        @delete="$emit('delete', item.id)"
      />
    </div>
  </div>
</template>
