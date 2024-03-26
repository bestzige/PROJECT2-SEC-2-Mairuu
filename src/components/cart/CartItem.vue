<script setup>
import { useLangStore } from '@/stores/lang'
import XButton from '../ui/XButton.vue'

const langStore = useLangStore()

defineEmits(['removeFromCart', 'addQuantity', 'subQuantity'])
defineProps({
  cart: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
    class="flex flex-row gap-2 p-2 rounded-lg md:text-lg lg:text-xl md:p-4 lg:p-6 select-none bg-white shadow-lg"
  >
    <div class="flex justify-center items-center">
      <img :src="cart.item.image" alt="item" class="w-14 h-14 object-cover rounded-md" />
    </div>
    <div class="flex flex-row justify-between w-full font-bold">
      <div>
        <p>({{ cart.quantity }}x) {{ langStore.getTextLang(cart.item, 'name', 'Item') }}</p>
      </div>
      <div class="flex flex-col justify-between">
        <p class="text-right">{{ cart.item.price * cart.quantity }}฿</p>
        <div class="flex gap-2">
          <XButton :disabled="cart.quantity === 1" @click="$emit('subQuantity', cart.item)" variant="gray">
            -
          </XButton>
          <XButton @click="$emit('addQuantity', cart.item)" variant="green">+</XButton>
          <XButton @click="$emit('removeFromCart', cart.item)" variant="danger"> x </XButton>
        </div>
      </div>
    </div>
  </div>
</template>
