<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import ColorMode from '@/components/ColorMode.vue'
import { GithubIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="container w-full h-16 grid grid-cols-3 grid-rows-1 px-2 py-2 my-4 place-items-center">
    <div class="place-self-start flex flex-row space-x-4 justify-center items-center">
      <img alt="Logo" class="logo inline" src="@/assets/logo.svg" width="48" height="48" />
      <span class="text-2xl font-semibold tracking-tight font-display">Ink'd Insults</span>
    </div>

    <NavigationMenu class="place-self-center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <RouterLink to="/">
            <NavigationMenuLink :class="navigationMenuTriggerStyle()"> Home </NavigationMenuLink>
          </RouterLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <RouterLink to="/about">
            <NavigationMenuLink :class="navigationMenuTriggerStyle()"> About </NavigationMenuLink>
          </RouterLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="place-self-end inline-flex flex-row place-items-center space-x-4">
      <ColorMode />
      <div class="font-mono">|</div>
      <a href="https://github.com/HarshNarayanJha/inkd-insults" target="_blank"><GithubIcon /></a>
    </div>
  </div>
</template>
