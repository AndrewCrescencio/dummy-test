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
  <PrimeCard style="width: 100%; overflow: hidden" class="rounded-xl bg-white shadow-md">
    <template #header>
      <img loading="lazy" height="288" alt="recipe image" :src="recipe.image" class="h-72 w-full object-fill object-center">
    </template>
    <template #title>
      {{ recipe.name }}
    </template>
    <template #subtitle>
      <p class="line-clamp-1" :title="recipe.tags.join(', ')">
        Tags: {{ recipe.tags.join(", ") }}
      </p>
    </template>
    <template #content>
      <p>
        Difficulty: {{ recipe.difficulty }}
      </p>
    </template>
    <template #footer>
      <PrimeButton label="Modo de preparo" class="z-10 mt-auto w-full cursor-pointer" @click="onClick()" />
    </template>
  </PrimeCard>
</template>

<style lang="scss" scoped>
:deep(.p-card-body) {
  height: 100%;
}
:deep(.p-card-footer) {
  margin-top: auto;
}
</style>
