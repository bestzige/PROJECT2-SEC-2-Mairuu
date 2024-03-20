<script setup>
defineProps({
  order: {
    type: Object
  },
  orderItems: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div v-if="order">
    <div class="text-3xl">Order # {{ order.id }}</div>
    <div class="flex flex-row flex-wrap gap-3">
      <div class="w-2/3">
        <div class="flex flex-col gap-3">
          <div
            v-for="(orderItem, index) in orderItems"
            :key="index"
            class="flex flex-row justify-between"
          >
            <div>{{ orderItem.item.name.en }}</div>
            <div>{{ orderItem.quantity }}</div>
            <div>{{ orderItem.item.price }}</div>
            <div>{{ orderItem.quantity * orderItem.item.price }}</div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="text-2xl">Total Price: {{ totalPrice }} baht</div>
        <div>
          <button class="bottom-0 right-0 bg-red-500 text-white p-2 rounded-lg">Clear Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
