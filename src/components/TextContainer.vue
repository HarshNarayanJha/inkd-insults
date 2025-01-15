<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from './ui/button'
import { Icon } from '@iconify/vue'

const { image } = defineProps<{
  image: File | null
}>()

const isLoading = ref(false)
const response = ref('')

const isDisabled = computed(() => {
  return !image || isLoading.value
})

const generateResponse = async () => {
  if (!image) {
    alert('Please upload an handwriting')
    return
  }

  isLoading.value = true
  response.value = ''

  try {
    // post to gemini
    response.value = `Asking gemini ${image.name}`
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
      <Button @click="generateResponse" :disabled="isDisabled">
        <Icon v-if="!isLoading" icon="radix-icons:image" />
        <Icon v-else icon="eos-icons:loading" class="mr-2 animate-spin" />
        {{ isLoading ? 'Generating...' : 'Generate Roast' }}
      </Button>

      <p v-if="response" class="text-justify mt-4 p-4 border rounded-lg whitespace-pre-wrap">
        {{ response }}
      </p>
    </div>
  </div>
</template>
