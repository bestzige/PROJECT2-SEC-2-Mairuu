<script setup>
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

defineProps({
  orderItem: {
    type: Object,
    required: true
  }
})

const getStatusColor = (status) => {
  switch (status) {
    // pending, completed, canceled
    case 'pending':
      return 'text-yellow-500'
    case 'completed':
      return 'text-green-500'
    case 'cancelled':
      return 'text-red-500'
  }
}
</script>

<template>
  <div
    class="flex flex-row gap-2 p-2 rounded-lg md:text-lg lg:text-xl md:p-4 lg:p-6 select-none bg-white shadow-lg"
  >
    <div class="flex justify-center items-center">
      <img :src="orderItem.item.image" alt="item" class="w-14 h-14 object-cover rounded-md" />
    </div>
    <div class="flex flex-row justify-between w-full font-bold">
      <div>
        <p>
          ({{ orderItem.quantity }}x) {{ langStore.getTextLang(orderItem.item, 'name', 'Item') }}
        </p>
      </div>
      <div class="flex flex-col justify-between">
        <p class="text-right">{{ orderItem.item.price * orderItem.quantity }}฿</p>
        <div class="flex gap-2">
          <p class="text-right" :class="getStatusColor(orderItem.status)">
            {{ langStore.getStaticTextLang(`status.history.${orderItem.status}`, 'Status') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
