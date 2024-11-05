<script setup lang="ts">
import type { Recipe } from '~/types/recipe.type'

interface Props {
  recipe: Recipe
}
const { recipe } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'seeInfo', value: Recipe): void
}>()

function onClick() {
  emit('seeInfo', recipe)
}
</script>

<template>
  <PrimeCard style="width: 100%; overflow: hidden" class="w-72 rounded-xl bg-white shadow-md">
    <template #header>
      <img alt="recipe image" :src="recipe.image">
    </template>
    <template #title>
      {{ recipe.name }}
    </template>
    <template #subtitle>
      <p>Tags: {{ recipe.tags.join(", ") }}</p>
    </template>
    <template #content>
      <p>
        Difficulty: {{ recipe.difficulty }}
      </p>
    </template>
    <template #footer>
      <PrimeButton label="Modo de preparo" class="z-10 w-full cursor-pointer" @click="onClick()" />
    </template>
  </PrimeCard>
</template>
