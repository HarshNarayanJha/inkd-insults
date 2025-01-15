<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './ui/button'
import { Icon } from '@iconify/vue'
import generateRoastFromImage from '@/services/gemini'
import { Skeleton } from '@/components/ui/skeleton'

const { image } = defineProps<{
  image: File | null
}>()

const isLoading = ref(false)
const response = ref('')

const generateResponse = async () => {
  if (!image) {
    alert('Please upload an handwriting')
    return
  }

  isLoading.value = true
  response.value = ''

  try {
    for await (const char of generateRoastFromImage(image)) {
      response.value += char
    }
  } catch (error) {
    console.error('Error generating response:', error)
    response.value = 'Error generating response. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-8 m-4 border rounded-md">
    <p class="font-semibold mb-8">2. Watch AI roast your handwriting</p>
    <div class="text-center">
      <Button @click="generateResponse" :disabled="!image || isLoading" class="mb-4">
        <Icon v-if="!isLoading" icon="radix-icons:image" />
        <Icon v-else icon="eos-icons:loading" class="mr-2 animate-spin" />
        {{ isLoading ? 'Generating...' : 'Generate Roast' }}
      </Button>

      <p v-if="response" class="text-start mt-4 p-4 border rounded-lg whitespace-pre-wrap">
        {{ response }}
      </p>

      <div v-if="!response && isLoading">
        <Skeleton v-for="i in 10" :key="i" class="h-4 w-full mt-4" />
      </div>
    </div>
  </div>
</template>
