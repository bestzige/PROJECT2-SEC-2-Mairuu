<script setup>
import CartList from '@/components/cart/CartList.vue'
import OrderFoodButton from '@/components/order/OrderFoodButton.vue'
import ServiceCallButton from '@/components/service-call/ServiceCallButton.vue'
import AppBar from '@/components/ui/AppBar.vue'
import BackButton from '@/components/ui/BackButton.vue'
</script>

<template>
  <div>
    <CartList />

    <AppBar>
      <div class="flex justify-between items-center gap-4">
        <ServiceCallButton />
        <OrderFoodButton />
      </div>
      <div class="mt-2">
        <BackButton :to="`/order/${$route.params.orderId}/menu`" />
      </div>
    </AppBar>
  </div>
</template>
