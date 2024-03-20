<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import { onMounted, onUnmounted, ref } from 'vue'
import XLoading from '@/components/ui/XLoading.vue'
import NavBar from '@/components/ui/NavBar.vue'
import { useLangStore } from '@/stores/lang'
import ServiceCalledBell from '@/components/service-call/ServiceCalledBell.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const langStore = useLangStore()
const orderStore = useOrderStore()

const invtervalId = ref(null)

const checkOrder = async (orderId) => {
  const order = await orderStore.getOrder(orderId)
  if (!order || order.status !== 'open') {
    if (invtervalId.value) {
      clearInterval(invtervalId.value)
    }
    await router.push('/')
  }
  loading.value = false
}

onMounted(async () => {
  await orderStore.getOrder(route.params.orderId)
  invtervalId.value = setInterval(async () => {
    await checkOrder(route.params.orderId)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(invtervalId.value)
})
</script>

<template>
  <DefaultLayout>
    <NavBar>
      <h1 class="text-md md:text-lg font-bold">
        {{ langStore.getTextLang(orderStore.currentOrder?.table, 'name', 'Table #X') }}
      </h1>
    </NavBar>
    <XLoading v-if="loading" />
    <div v-else class="flex flex-col h-full px-4 py-2">
      <router-view />
    </div>
    <ServiceCalledBell />
  </DefaultLayout>
</template>
