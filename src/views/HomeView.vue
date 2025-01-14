<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowDownIcon } from 'lucide-vue-next'
</script>

<template>
  <main>
    <div class="min-h-svh flex flex-col justify-center items-center px-4 overflow-hidden">
      <div class="z-10 text-center space-y-8">
        <h1
          class="text-8xl font-semibold tracking-tight drop-shadow-lg transform hover:scale-105 transition-transform duration-100 ease-in">
          Love your handwriting?
        </h1>
        <h2 class="text-3xl font-medium tracking-wide">
          Check yourself <ArrowDownIcon class="inline" />
        </h2>
        <h3
          class="text-xl font-medium tracking-normal transform -rotate-2 hover:rotate-0 transition-transform">
          You will hate it
        </h3>
      </div>
      <div class="my-16 px-4 py-2 flex flex-row space-x-4 justify-between">
        <Button variant="default">Upload Your Handwriting</Button>
        <Button variant="outline">Try out an Example!</Button>
      </div>
    </div>
  </main>
</template>
