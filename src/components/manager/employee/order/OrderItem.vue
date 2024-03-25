<script setup>
defineProps(['orderItem'])
defineEmits(['openModal'])
</script>
<template>
  <div class="flex flex-row justify-between items-center w-full font-bold">
    <img
      v-if="orderItem.item.image"
      :src="orderItem.item.image"
      alt="item"
      class="w-10 h-10 object-cover rounded-md"
    />
    <p>Table: {{ orderItem.order.tableId }} (Order#{{ orderItem.id }})</p>
    <div class="flex flow-row gap-2">
      <div class="flex flex-col items-end">
        <p class="text-right">{{ orderItem.item.name.en }} ({{ orderItem.quantity }}x)</p>
      </div>
      <button
        class="bg-green-500 text-white px-2 rounded hover:bg-green-600"
        @click="$emit('openModal', orderItem, 'completed')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
      <button
        class="bg-red-500 text-white px-2 rounded hover:bg-red-600"
        @click="$emit('openModal', orderItem, 'cancelled')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
