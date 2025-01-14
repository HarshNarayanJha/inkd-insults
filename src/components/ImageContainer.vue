<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="image">Choose the image of you handwriting</Label>
    <Input type="file" name="image" id="image" />
  </div>
</template>
