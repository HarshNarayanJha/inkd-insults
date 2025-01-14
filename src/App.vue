<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <header>
    <AppHeader />
  </header>

  <RouterView />
</template>

<style scoped></style>
