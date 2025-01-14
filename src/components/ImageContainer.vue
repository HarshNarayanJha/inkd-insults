<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="p-8 m-4 border rounded-md">
    <p class="font-semibold">1. Upload a photo of your nice Handwriting</p>
    <img src="..." alt="User Handwriting" class="my-4 w-full max-w-[500px] aspect-square" />
    <div class="grid w-full max-w-sm items-center justify-center gap-1.5 m-auto">
      <Label for="image">Choose the image of you handwriting</Label>
      <Input type="file" name="image" id="image" />
    </div>
  </div>
</template>
