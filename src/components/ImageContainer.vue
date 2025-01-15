<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'

const image = ref<HTMLImageElement | null>(null)
const currentImage = ref<File | null>(null)
const previewImage = ref<string>('')

const emit = defineEmits<{
  'update-image': [image: File]
}>()

const selectImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target && target.files) {
    currentImage.value = target.files.item(0)
    if (currentImage.value) {
      previewImage.value = URL.createObjectURL(currentImage.value)
      emit('update-image', currentImage.value)
    }
  }
}
</script>

<template>
  <div class="p-8 m-4 border rounded-md">
    <p class="font-semibold">1. Upload a photo of your nice Handwriting</p>
    <img
      :src="previewImage"
      alt="User Handwriting"
      class="my-4 m-auto w-full max-w-[500px] aspect-square border-2 rounded-xl shadow-lg scale-100 hover:scale-110 transition-transform"
      ref="image" />
    <div class="grid w-full max-w-sm items-center justify-center gap-1.5 m-auto mt-8">
      <Label for="image">Choose the image of you handwriting</Label>
      <Input type="file" name="image" id="image " accept="image/*" @change="selectImage" />
    </div>
  </div>
</template>
