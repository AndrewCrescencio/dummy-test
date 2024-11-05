<script setup lang="ts">
import type { Recipe } from '~/types/recipe.type'

interface Props {
  listRecipes: Recipe[]
}
defineProps<Props>()

const modalRef = ref()
const currentRecipeInfo = ref<Recipe>()

function seeInfo(payload: Recipe) {
  currentRecipeInfo.value = payload
  nextTick(() => {
    modalRef.value.openModal()
  })
}
</script>

<template>
  <div class="grid grid-cols-1 mx-auto mb-5 mt-10 justify-center justify-items-center gap-4 lg:grid-cols-3 md:grid-cols-2 md:gap-6">
    <CardRecipe v-for="recipe in listRecipes" :key="recipe.id" :recipe="recipe" @see-info="seeInfo" />
  </div>
  <AppDialog v-if="currentRecipeInfo" ref="modalRef" title="Modo de preparo">
    <CardRecipeInfo :recipe="currentRecipeInfo" class="border-none color-inherit" />
  </AppDialog>
</template>
