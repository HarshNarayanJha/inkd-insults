<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowDownIcon } from 'lucide-vue-next'
</script>

<template>
  <main>
    <div class="min-h-svh flex flex-col justify-center items-center px-4 overflow-hidden">
      <div class="z-10 text-center space-y-8">
        <h1
          class="text-8xl font-semibold tracking-tight font-display drop-shadow-lg transform hover:scale-105 transition-transform duration-100 ease-in">
          Love your <span class="font-hand">handwriting?</span>
        </h1>
        <h2 class="text-3xl font-medium tracking-wide font-body">
          Check yourself <ArrowDownIcon class="inline" />
        </h2>
        <h3
          class="text-2xl font-medium tracking-normal font-hand-alt transform -rotate-2 hover:rotate-0 transition-transform">
          You will hate it
        </h3>
      </div>
      <div class="my-16 px-4 py-2 flex flex-row space-x-4 justify-between font-display">
        <Button variant="default" size="lg" class="text-md text-xl font-bold">
          Upload Your Handwriting
        </Button>
        <Button variant="outline" size="lg" class="text-md text-xl font-light">Try out an Example!</Button>
      </div>
    </div>
  </main>
</template>
