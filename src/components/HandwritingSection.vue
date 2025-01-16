<script setup lang="ts">
import { ref } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import ImageContainer from './ImageContainer.vue'
import TextContainer from './TextContainer.vue'

const image = ref<File | null>(null)

const updateImage = (newImage: File) => {
  image.value = newImage
}
</script>

<template>
  <div
    id="handwriting-section"
    class="container min-h-svh flex flex-col space-y-8 justify-start items-center px-4 py-8">
    <h2 class="text-4xl md:text-6xl font-medium font-body tracking-wide text-center">
      Wanna try it out?
    </h2>
    <div class="hidden md:block w-full">
      <ResizablePanelGroup
        id="resize-handwriting-group"
        direction="horizontal"
        class="min-h-[200px] max-h-max rounded-lg border">
        <ResizablePanel id="panel-file" :default-size="50">
          <ImageContainer @update-image="updateImage" />
        </ResizablePanel>
        <ResizableHandle id="handle-1" with-handle />
        <ResizablePanel id="panel-text" :default-size="50">
          <TextContainer :image="image" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
    <div class="flex md:hidden flex-col gap-4 justify-start items-stretch">
      <ImageContainer @update-image="updateImage" />
      <TextContainer :image="image" />
    </div>
  </div>
</template>
