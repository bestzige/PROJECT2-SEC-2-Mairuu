<script setup>
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

defineProps({
  orderItem: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <tr>
    <td>{{ langStore.getTextLang(orderItem.item, 'name', 'Item') }}</td>
    <td>{{ orderItem.quantity }}</td>
    <td>{{ orderItem.item.price * orderItem.quantity }}</td>
    <td>
      {{ orderItem.status }}
    </td>
  </tr>
</template>
