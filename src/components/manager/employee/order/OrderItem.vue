<script setup>
defineProps(['orderItem'])
defineEmits(['openModal'])
</script>
<template>
  <div class="flex flex-row justify-between items-center w-full font-bold">
    <div class="flex w-2/5">
      <img
        v-if="orderItem.type == 'order' && orderItem.item.image"
        :src="orderItem.item.image"
        alt="item"
        class="w-10 h-10 object-cover rounded-md"
      />
      <svg
        v-if="orderItem.type == 'service'"
        class="w-10 h-10 object-cover rounded-md"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M12 5a2 2 0 0 1 2 2c0 .24-.04.47-.12.69C17.95 8.5 21 11.91 21 16H3c0-4.09 3.05-7.5 7.12-8.31c-.08-.22-.12-.45-.12-.69a2 2 0 0 1 2-2m10 14H2v-2h20zM12 9.5c-3.11 0-5.75 1.89-6.66 4.5h13.32c-.91-2.61-3.55-4.5-6.66-4.5"
        />
      </svg>
    </div>

    <div class="flex w-1/5">
      <p>Table: {{ orderItem.order.tableId }} (Order#{{ orderItem.id }})</p>
    </div>

    <div class="flex flow-row gap-2 w-2/5 justify-end">
      <div class="flex flex-col items-end">
        <p v-if="orderItem.type == 'order'" class="text-right">
          {{ orderItem.item.name.en }} ({{ orderItem.quantity }}x)
        </p>
        <p v-if="orderItem.type == 'service'">Service call (1x)</p>
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
