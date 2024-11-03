<script setup>
import { useAsyncData } from 'nuxt/app'
import { useRoute } from 'vue-router'

const route = useRoute()
const tag = route.params.tag

const { data: recipes } = await useAsyncData('recipes', async () => {
  const response = await fetch(`https://dummyjson.com/recipes/tag/${tag}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  const data = await response.json()
  return data.recipes
})
</script>

<template>
  <section class="mx-auto py-10 container">
    <h1 class="mb-10 text-xl">
      Receitas com a tag: {{ tag }}
    </h1>
    <ListRecipes v-if="recipes" :list-recipes="recipes" />
    <p v-else>
      Carregando receitas...
    </p>
  </section>
</template>
