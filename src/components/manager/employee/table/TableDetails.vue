<script setup>
import ManagerHeader from '@/components/manager/ManagerHeader.vue'

defineProps({
  order: Object,
  orderItems: Array
})
</script>

<template>
  <div class="flex flex-col w-full px-5 md:px-10 lg:px-20">
    <ManagerHeader>Order # {{ order.id }} (Table {{ order.tableId }})</ManagerHeader>

    <div class="flex flex-col gap-4 p-4 max-h-96">
      <div class="overflow-auto">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="text-left">Item</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Price/EA</th>
              <th class="text-left">Total Price</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orderItems.length <= 0">
              <td colspan="5" class="text-center font-bold text-gray-500">No order items</td>
            </tr>
            <tr v-for="orderItem in orderItems" :key="orderItem.id">
              <td>{{ orderItem.item.name.en }}</td>
              <td>{{ orderItem.quantity }}</td>
              <td>{{ orderItem.item.price }}</td>
              <td>{{ orderItem.quantity * orderItem.item.price }}</td>
              <td>{{ orderItem.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
