<script setup>
import { useLangStore } from '@/stores/lang'
import { ref } from 'vue'
import XButton from '../ui/XButton.vue'

const langStore = useLangStore()
const orderId = ref(null)
</script>

<template>
  <form class="flex flex-col w-full gap-4 border-2 border-gray-300 p-4 rounded-lg">
    <label for="orderId" class="text-sm">
      {{ langStore.getStaticTextLang('home.order-form.input.order-id.label', 'Order ID') }}
    </label>
    <input
      id="orderId"
      type="text"
      v-model.trim="orderId"
      :placeholder="
        langStore.getStaticTextLang('home.order-form.input.order-id.placeholder', 'Enter order ID')
      "
      class="p-2 border-2 border-gray-300 rounded-lg"
    />
    <XButton v-if="!orderId" variant="danger" :disabled="orderId">
      {{ langStore.getStaticTextLang('home.order-form.cant-submit', "Can't submit") }}
    </XButton>

    <XButton v-if="orderId" :to="`/order/${orderId}`" :disabled="!orderId">
      {{ langStore.getStaticTextLang('home.order-form.submit', 'Order') }}
    </XButton>
  </form>
</template>
