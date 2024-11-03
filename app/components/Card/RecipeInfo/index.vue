<script setup lang="ts">
import type { Recipe } from '~/types/recipe.type'

interface Props {
  recipe: Recipe
}
defineProps<Props>()
</script>

<template>
  <PrimeCard class="w-full overflow-hidden !shadow-none">
    <template #header>
      <img alt="user header" :src="recipe.image">
    </template>
    <template #title>
      {{ recipe.name }}
    </template>
    <template #subtitle>
      <p>Tags: {{ recipe.tags.join(", ") }}</p>
    </template>
    <template #content>
      <p class="mb-2">
        Dificuldade: {{ recipe.difficulty }}
      </p>
      <p class="mb-5">
        Servings:
        <span class="sr-only">{{ recipe.servings }}</span>
        <template v-for="_ in recipe.servings" :key="_">
          &#127829;
        </template>
      </p>
      <p class="mb-4 text-xl">
        Ingredients
      </p>
      <ul class="list-decimal list-inside">
        <li v-for="step in recipe.ingredients" :key="step" class="mb-2">
          {{ step }}
        </li>
      </ul>
      <p class="mb-4 text-xl">
        Instructions
      </p>
      <ul class="list-decimal list-inside">
        <li v-for="step in recipe.instructions" :key="step" class="mb-2">
          {{ step }}
        </li>
      </ul>
    </template>
  </PrimeCard>
</template>

<!-- <style lang="scss" scoped>
:deep(.p-card) {
  background-color: red !important;
  display: none !important;
}
</style> -->
