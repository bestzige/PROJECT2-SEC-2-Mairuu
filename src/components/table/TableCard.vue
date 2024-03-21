<script setup>
defineProps({
  order: {
    type: Object
  },
  orderItems: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div v-if="order">
    <div class="text-3xl">Order # {{ order.id }}</div>
    <div class="flex flex-row flex-wrap gap-3">
      <div class="w-full">
        <div class="flex flex-col gap-3 p-2">
          <div class="flex flex-row text-2xl">
            <div class="w-1/5">Item</div>
            <div class="w-1/5">Quantity</div>
            <div class="w-1/5">Price/EA</div>
            <div class="w-1/5">Total Price</div>
            <div class="w-1/5">Status</div>
          </div>
          <div v-for="(orderItem, index) in orderItems" :key="index" class="flex flex-row">
            <!-- <div class="w-1/5">{{ orderItem.item.name.en }}</div> -->
            <div class="w-1/5">{{ orderItem.quantity }}</div>
            <div class="w-1/5">{{ orderItem.item.price }}</div>
            <div class="w-1/5">{{ orderItem.quantity * orderItem.item.price }}</div>
            <div class="w-1/5">{{ orderItem.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
