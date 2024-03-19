<script setup>
import { useLangStore } from '@/stores/lang'
import OrderHistoryItem from './OrderHistoryItem.vue'

defineProps({
  orderItems: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

const langStore = useLangStore()
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h1 class="text-xl font-bold text-center">
      {{
        orderItems.length === 0
          ? langStore.getStaticTextLang('order.history.empty', 'Your order history is empty')
          : langStore.getStaticTextLang('order.history.title', 'Your order history') +
            ` (${orderItems.length})`
      }}
    </h1>
    <p class="text-right font-bold text-lg text-red-500">
      {{ langStore.getStaticTextLang('order.history.total', 'Total') }}: {{ totalPrice }}฿
    </p>
    <OrderHistoryItem v-for="orderItem in orderItems" :key="orderItem.id" :orderItem="orderItem" />
  </div>
</template>
