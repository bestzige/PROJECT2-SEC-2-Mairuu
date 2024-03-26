<script setup>
import { useLangStore } from '@/stores/lang'
import { useOrderStore } from '@/stores/order'
import { useRoute } from 'vue-router'
import XButton from '../ui/XButton.vue'

const route = useRoute()
const langStore = useLangStore()
const orderStore = useOrderStore()

const orderFood = async () => {
  await orderStore.itemOrdered(route.params.orderId)
}
</script>

<template>
  <XButton
    :disabled="orderStore.cartItems.length === 0"
    @click="orderFood"
    fullWidth
    :to="`/order/${route.params.orderId}/history`"
    variant="orange"
  >
    {{ langStore.getStaticTextLang('order.order-food.button', 'Order Food') }}
  </XButton>
</template>
