<script setup>
import CategoryList from '@/components/category/CategoryList.vue'
import ServiceCallButton from '@/components/service-call/ServiceCallButton.vue'
import AppBar from '@/components/ui/AppBar.vue'
import XButton from '@/components/ui/XButton.vue'
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()
</script>

<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <CategoryList withImage />
    </div>
    <AppBar>
      <div class="flex justify-between items-center gap-4">
        <ServiceCallButton />
        <XButton :to="`/order/${$route.params.orderId}/history`" fullWidth variant="warning">
          <span class="ml-2">{{
            langStore.getStaticTextLang('order.history.button', 'Order History')
          }}</span>
        </XButton>
      </div>
    </AppBar>
  </div>
</template>
