<script setup>
import tablejson from '../../../data/db.json'
const tables = tablejson[1]
</script>
 
<template>
<div>
    <div v-for="(table,index) in tables" :key="index">{{ table }}</div>
</div>
</template>
 
<style scoped>

</style>