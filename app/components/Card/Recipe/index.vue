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
      <div class="h-72 w-full flex items-center justify-center overflow-hidden">
        <img loading="lazy" alt="recipe image" :src="recipe.image" class="h-full w-full object-cover">
      </div>
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
