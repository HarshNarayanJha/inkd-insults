<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import ColorMode from '@/components/ColorMode.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div
    class="container w-full h-auto min-h-16 grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-1 gap-4 md:gap-0 px-2 md:px-12 py-2 my-4 place-items-center">
    <div
      class="place-self-center md:place-self-start flex flex-row space-x-4 justify-center items-center">
      <img
        alt="Logo"
        class="logo inline w-10 md:w-12"
        src="@/assets/logo.svg"
        width="48"
        height="48" />
      <span class="text-xl md:text-2xl font-semibold tracking-tight font-display"
        >Ink'd Insults</span
      >
    </div>

    <NavigationMenu class="place-self-center">
      <NavigationMenuList class="flex-col md:flex-row">
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

    <div
      class="place-self-center md:place-self-end inline-flex flex-row place-items-center space-x-4">
      <ColorMode />
      <div class="font-mono">|</div>
      <a href="https://github.com/HarshNarayanJha/inkd-insults" target="_blank">
        <Icon
          icon="radix-icons:github-logo"
          class="h-[1.4rem] w-[1.4rem] md:h-[1.6rem] md:w-[1.6rem] ml-2" />
      </a>
    </div>
  </div>
</template>
