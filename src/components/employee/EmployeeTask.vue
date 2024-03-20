<script setup></script>

<template>
  <div class="w-full">
    <div class="w-full bg-slate-200">
      <div class="flex gap-4 mx-auto py-20 justify-between items-center">
        <router-link
          :to="`/employee/tables`"
          class="mx-auto text-6xl w-80 h-80 flex text-center justify-center items-center rounded-3xl bg-theme-200 border-2 border-black"
        >
          TABLE MANAGER
        </router-link>
        <router-link
          :to="`/employee/order-manager`"
          class="mx-auto text-6xl w-80 h-80 flex text-center justify-center items-center rounded-3xl bg-theme-200 border-2 border-black"
        >
          ORDER MANAGER
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<style scoped></style>
