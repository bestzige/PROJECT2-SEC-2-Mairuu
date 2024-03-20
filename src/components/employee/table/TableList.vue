<script setup>
defineProps({
  tables: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="w-full">
    <div class="w-full bg-slate-200 border-2 border-black">
      <div
        class="w-full h-auto text-5xl text-white text-center bg-yellow-500 border-b-2 border-black"
      >
        TABLES
      </div>
      <div class="flex flex-row gap-3 flex-wrap justify-around py-2">
        <router-link
          v-for="(table, index) in tables"
          :key="index"
          class="text-2xl w-44 h-36 flex justify-center bg-yellow-500 border-2 border-black"
          :to="`/employee/table-detail/${table.id}`"
        >
          {{ table.name.en }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
