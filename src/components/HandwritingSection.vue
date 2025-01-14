<script setup lang="ts">
import ImageContainer from './ImageContainer.vue'
import TextContainer from './TextContainer.vue'
</script>

<template>
  <div class="flex flex-col space-y-8 justify-center items-center">
    <h2 class="text-4xl font-medium font-body tracking-wide">Wanna try it out?</h2>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-4 place-items-center place-content-center">
      <ImageContainer />
      <TextContainer />
    </div>
  </div>
</template>
