<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import generateRoastFromImage from '@/services/gemini'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const { image } = defineProps<{
  image: File | null
}>()

const taste = ref('funny')
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
    for await (const char of generateRoastFromImage(image, taste.value)) {
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
    <p class="font-semibold mb-8">2. Watch AI roast your handwriting in a {{ taste }} way</p>
    <div class="text-center flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <Label for="taste">Tone</Label>
        <Select v-model="taste" defaultValue="funny" id="taste">
          <SelectTrigger class="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Taste</SelectLabel>
              <SelectItem selected value="funny">Funny</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
              <SelectItem value="brutal">Brutal</SelectItem>
              <SelectItem value="sarcastic">Sarcastic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
