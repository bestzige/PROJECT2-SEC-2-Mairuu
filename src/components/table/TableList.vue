<script setup>
defineProps({
  tables: {
    type: Array,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="w-full">
    <div class="w-full bg-slate-200 border-2 border-black">
      <div
        class="w-full h-auto text-5xl text-white text-center bg-theme-100 border-b-2 border-black"
      >
        TABLES
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4 mx-auto items-center"
      >
        <button
          v-if="admin"
          class="mx-auto text-2xl w-44 h-36 flex justify-center items-center bg-theme-300 border-2 border-black"
        >
          +
        </button>
        <router-link
          v-for="(table, index) in tables"
          :key="index"
          class="mx-auto text-2xl w-44 h-36 flex justify-center bg-theme-300 border-2 border-black"
          :to="`/employee/table-detail/${table.id}`"
        >
          {{ table.name.en }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
