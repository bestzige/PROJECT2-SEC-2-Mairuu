<script setup>
import CategoryList from '@/components/category/CategoryList.vue'
import ItemList from '@/components/item/ItemList.vue'
import AppBar from '@/components/ui/AppBar.vue'
import ServiceCallButton from '@/components/service-call/ServiceCallButton.vue'
import { useCategoryStore } from '@/stores/category'
import { useLangStore } from '@/stores/lang'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import XButton from '@/components/ui/XButton.vue'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const route = useRoute()
const categories = ref([])
const langStore = useLangStore()
const orderStore = useOrderStore()
const categoryStore = useCategoryStore()

const refetchCategories = async () => {
  categories.value = await categoryStore.getPublishedCategories()
}

onMounted(async () => {
  await refetchCategories()
  if (!route.params.categoryId) {
    if (categories.value.length > 0) {
      router.replace(`/order/${route.params.orderId}/menu/${categories.value[0].id}`)
    } else {
      router.replace(`/order/${route.params.orderId}`)
    }
  }
})

const back = () => {
  const index = categories.value.findIndex((category) => category.id === route.params.categoryId)
  if (index > 0) {
    router.replace(`/order/${route.params.orderId}/menu/${categories.value[index - 1].id}`)
  } else {
    router.replace(`/order/${route.params.orderId}`)
  }
}

const next = () => {
  const index = categories.value.findIndex((category) => category.id === route.params.categoryId)
  if (index < categories.value.length - 1) {
    router.replace(`/order/${route.params.orderId}/menu/${categories.value[index + 1].id}`)
  }
}
</script>

<template>
  <div>
    <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-4 gap-2 md:gap-4">
      <CategoryList :withImage="false" />
    </div>
    <div class="w-full h-full overflow-y-auto">
      <ItemList />
    </div>
    <div class="flex justify-between">
      <XButton v-if="categories?.length > 0" @click="back">
        {{ langStore.getStaticTextLang('back.button', 'Back') }}
      </XButton>
      <XButton
        v-if="
          categories?.length > 0 && route.params.categoryId !== categories[categories.length - 1].id
        "
        @click="next"
      >
        {{ langStore.getStaticTextLang('next.button', 'Next') }}
      </XButton>
    </div>

    <AppBar>
      <div class="flex justify-between items-center gap-4">
        <ServiceCallButton />
        <XButton :to="`/order/${$route.params.orderId}/cart`" fullWidth>
          <span>
            {{ langStore.getStaticTextLang('order.order-food.button', 'Order Food') }}
          </span>
          <span class="ml-2 text-red-500"> ({{ orderStore.totalQuantityInCart }}) </span>
        </XButton>
      </div>
      <div class="mt-2">
        <XButton :to="`/order/${$route.params.orderId}`" fullWidth variant="warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-house-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"
            />
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
          </svg>
          <span class="ml-2">{{ langStore.getStaticTextLang('home.button', 'Home') }}</span>
        </XButton>
      </div>
    </AppBar>
  </div>
</template>
