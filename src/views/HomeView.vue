<script setup>
import GoToOrderForm from '@/components/home/GoToOrderForm.vue'
import XButton from '@/components/ui/XButton.vue'
</script>

<template>
  <main>
    <GoToOrderForm />
    <div class="flex gap-4 mx-auto py-20 justify-between items-center">
      <XButton to="/admin" class="mx-auto w-full">Admin</XButton>
      <XButton to="/employee" class="mx-auto w-full">Employee</XButton>
    </div>
  </main>
</template>
