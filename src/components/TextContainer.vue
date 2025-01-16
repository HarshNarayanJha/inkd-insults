<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import generateRoastFromImage from '@/services/gemini'

import { Badge } from '@/components/ui/badge'
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
const lscore = ref(-1.0)
const dscore = ref(-1.0)
const nscore = ref(-1.0)
const ptraits = ref<Array<string>>([])
const tips = ref<Array<string>>([])
const uchars = ref<Array<string>>([])
const text = ref('')

const generateResponse = async () => {
  if (!image) {
    alert('Please upload an handwriting')
    return
  }

  isLoading.value = true
  response.value = ''

  try {
    const data = await generateRoastFromImage(image, taste.value)

    // const data = await new Promise(resolve =>
    //   setTimeout(
    //     () =>
    //       resolve({
    //         design_score: 0.8,
    //         improvement_tips: [
    //           'Try using a more consistent slant in your letters.',
    //           'Practice writing in a more controlled manner to reduce inconsistencies.',
    //         ],
    //         legibility_score: 0.9,
    //         message:
    //           "This handwriting is like a rollercoaster – some parts are smooth sailing, others are a bumpy ride! Those loopy 'g's are quite adventurous, I bet they've been to a calligraphy convention or two.  The 'M's and 'W's are as wide as a football field, I'd be worried about running out of page space. And the signature? A mysterious squiggle that only the recipient can truly decipher.  It's a personality in itself, really.",
    //         neatness_score: 0.7,
    //         personality_traits: ['Expressive', 'Creative', 'Unconventional'],
    //         text: 'October 13th, 2022.\nMay Allah grant the beautiful Soul of Mama\netarnal rest and reward her with His Aljannah\nFirdaus. May Allah also grant the SHAGAYA family\nthe fortitude to bear the irreparable loss. On\nbehalf of my Principal, Asiwaju BOLA AHMED\nTINUBU and the entire APC Team, please accept our\nSincere Condolences and best wishes.\nKASHIM SHETTIMA.',
    //         unique_characteristics: ['Varying slant and letter sizes', 'Elaborate signature'],
    //       }),
    //     1000
    //   )
    // )

    // console.log(data)

    for (const char of data.message) {
      response.value += char
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    lscore.value = data.legibility_score

    await new Promise(resolve => setTimeout(resolve, 500))
    dscore.value = data.design_score

    await new Promise(resolve => setTimeout(resolve, 500))
    nscore.value = data.neatness_score

    await new Promise(resolve => setTimeout(resolve, 500))
    ptraits.value = data.personality_traits

    await new Promise(resolve => setTimeout(resolve, 500))
    tips.value = data.improvement_tips

    await new Promise(resolve => setTimeout(resolve, 500))
    uchars.value = data.unique_characteristics

    for (const char of data.text) {
      text.value += char
      await new Promise(resolve => setTimeout(resolve, 5))
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
        <Label for="taste">Taste</Label>
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

      <div id="stats" v-if="response" class="mt-2 text-start">
        <ul>
          <li v-if="lscore >= 0.0" class="font-semibold">
            Legibility Score: <span class="font-medium">{{ lscore * 100 }}%</span>
          </li>
          <li v-if="dscore >= 0.0" class="font-semibold">
            Design Score: <span class="font-medium">{{ dscore * 100 }}%</span>
          </li>
          <li v-if="nscore >= 0.0" class="font-semibold">
            Neatness Score: <span class="font-medium">{{ nscore * 100 }}%</span>
          </li>

          <li v-if="ptraits.length > 0" class="my-4">
            <span class="font-semibold block">Your Personality Traits from your handwriting</span>
            <Badge v-for="trait in ptraits" :key="trait" variant="outline" class="mx-1">{{
              trait
            }}</Badge>
          </li>

          <li v-if="uchars.length > 0" class="my-4">
            <span class="font-semibold block">Unique Characteristics of your handwriting</span>
            <Badge v-for="char in uchars" :key="char" variant="outline" class="mx-1">{{
              char
            }}</Badge>
          </li>

          <li v-if="tips.length > 0" class="my-4">
            <span class="font-semibold block">Some tips to improve your handwriting</span>
            <ul>
              <li v-for="tip in tips" :key="tip">- {{ tip }}</li>
            </ul>
          </li>
        </ul>

        <h4 class="font-semibold text-md mt-4">Text transcription:</h4>
        <p v-if="text">
          {{ text }}
        </p>
      </div>

      <div v-if="!response && isLoading">
        <Skeleton v-for="i in 10" :key="i" class="h-4 w-full mt-4" />
      </div>
    </div>
  </div>
</template>
