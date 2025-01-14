<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import ImageContainer from './ImageContainer.vue'
import TextContainer from './TextContainer.vue'
</script>

<template>
  <div class="container min-h-svh flex flex-col space-y-8 justify-start items-center px-4 py-8">
    <h2 class="text-6xl font-medium font-body tracking-wide">Wanna try it out?</h2>
    <ResizablePanelGroup
      id="resize-handwriting-group"
      direction="horizontal"
      class="min-h-[200px] rounded-lg border">
      <ResizablePanel id="panel-file" :default-size="50">
        <ImageContainer />
      </ResizablePanel>
      <ResizableHandle id="handle-1" with-handle />
      <ResizablePanel id="panel-text" :default-size="50">
        <TextContainer />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
