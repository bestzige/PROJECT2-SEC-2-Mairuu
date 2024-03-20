<script setup>
import ServiceCalledBell from '@/components/service-call/ServiceCalledBell.vue'
import NavBar from '@/components/ui/NavBar.vue'
import XLoading from '@/components/ui/XLoading.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useLangStore } from '@/stores/lang'
import { useOrderStore } from '@/stores/order'
import { useUiStore } from '@/stores/ui'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const uiStore = useUiStore()
const langStore = useLangStore()
const orderStore = useOrderStore()

const invtervalId = ref(null)

const checkOrder = async (orderId) => {
  const order = await orderStore.getOrder(orderId)
  loading.value = false
  if (order && order.status === 'open') return

  if (!order) {
    uiStore.addToast({
      message: langStore.getStaticTextLang('order.order-not-found', 'Order not found'),
      type: 'error'
    })
  }

  if (order && order.status === 'closed') {
    uiStore.addToast({
      message: langStore.getStaticTextLang('order.order-closed', 'Order closed'),
      type: 'error'
    })
  }

  if (invtervalId.value) {
    clearInterval(invtervalId.value)
  }

  await router.push('/')
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
      <router-link :to="`/order/${route.params.orderId}`">
        <h1 class="text-md md:text-lg font-bold">
          {{ langStore.getTextLang(orderStore.currentOrder?.table, 'name', 'Table #X') }}
        </h1>
      </router-link>
    </NavBar>
    <XLoading v-if="loading" />
    <div v-else class="flex flex-col h-full px-4 py-2">
      <router-view />
    </div>
    <ServiceCalledBell />
  </DefaultLayout>
</template>
