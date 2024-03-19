<script setup>
import OrderHistoryRow from '@/components/order/OrderHistoryRow.vue'
import { useLangStore } from '@/stores/lang'

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
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th>
          {{ langStore.getStaticTextLang('order.history.table.header.item', 'Item') }}
        </th>
        <th>
          {{ langStore.getStaticTextLang('order.history.table.header.quantity', 'Quantity') }}
        </th>
        <th>
          {{ langStore.getStaticTextLang('order.history.table.header.price', 'Price') }}
        </th>
        <th>
          {{ langStore.getStaticTextLang('order.history.table.header.status', 'Status') }}
        </th>
      </tr>
    </thead>
    <tbody class="w-full">
      <OrderHistoryRow v-for="orderItem in orderItems" :key="orderItem.id" :orderItem="orderItem" />
    </tbody>
    <tfoot class="w-full">
      <p class="text-right">
        {{ langStore.getStaticTextLang('order.history.table.footer.total', 'Total') }}:
        {{ totalPrice }}
      </p>
    </tfoot>
  </table>
</template>
