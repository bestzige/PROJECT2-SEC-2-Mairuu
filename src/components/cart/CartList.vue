<script setup>
import { useOrderStore } from '@/stores/order'
import CartItem from './CartItem.vue'
import { useLangStore } from '@/stores/lang'

const orderStore = useOrderStore()
const langStore = useLangStore()
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h1 class="text-xl font-bold text-center">
      {{
        orderStore.cartItems.length === 0
          ? langStore.getStaticTextLang('cart.empty', 'Your cart is empty')
          : `${langStore.getStaticTextLang('cart.title', 'Your cart')} (${orderStore.totalQuantityInCart})`
      }}
    </h1>
    <CartItem
      v-for="cart in orderStore.cartItems"
      :key="cart.id"
      :cart="cart"
      @removeFromCart="() => orderStore.removeFromCart(cart.id)"
      @addQuantity="() => orderStore.addQuantity(cart.id)"
      @subQuantity="() => orderStore.subQuantity(cart.id)"
    />
  </div>
</template>
