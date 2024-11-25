<template>
  <div>
   <h1>{{ store.username }}의 개인 프로필 페이지 </h1>  
  
  
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter"; // Pinia store import
const store = useCounterStore();

</script>

<style lang="scss" scoped>

</style>