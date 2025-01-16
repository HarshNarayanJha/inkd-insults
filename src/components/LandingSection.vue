<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'

const scrollToHandwriting = () => {
  document.getElementById('handwriting-section')?.scrollIntoView({ behavior: 'smooth' })
}

const setupExample = () => {
  scrollToHandwriting()
}
</script>

<template>
  <main>
    <div class="min-h-svh flex flex-col justify-center items-center px-4 overflow-hidden">
      <div class="z-10 text-center space-y-4 md:space-y-8 mt-auto">
        <h1
          class="text-5xl md:text-8xl font-semibold tracking-tight font-display drop-shadow-lg transform hover:scale-105 transition-transform duration-100 ease-in">
          Love your <span class="font-hand underline">handwriting?</span>
        </h1>
        <h2 class="text-2xl md:text-3xl font-medium tracking-wide font-body">
          Check for yourself <Icon icon="radix-icons:arrow-down" class="inline" />
        </h2>
        <h3
          class="text-md md:text-2xl font-medium tracking-normal font-hand-alt transform -rotate-2 hover:rotate-0 transition-transform">
          You will hate it
        </h3>
      </div>
      <div
        class="my-12 md:my-16 px-4 py-2 flex flex-col md:flex-row gap-4 justify-between font-display">
        <Button variant="default" size="lg" class="text-xl font-bold" @click="scrollToHandwriting">
          Upload Your Handwriting
        </Button>
        <Button variant="outline" size="lg" class="text-xl font-light" @click="setupExample">
          Try out an Example!
        </Button>
      </div>
      <div class="mt-auto mb-64 md:mb-32 text-3xl animate-pulse">
        <Icon icon="radix-icons:double-arrow-down" />
      </div>
    </div>
  </main>
</template>
