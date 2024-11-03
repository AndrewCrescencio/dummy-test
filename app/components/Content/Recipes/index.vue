<script setup lang="ts">
const { data: recipesTags } = await useAsyncData(
  'recipes-tags',
  () => $fetch('https://dummyjson.com/recipes/tags'),
)
</script>

<template>
  <section class="mx-auto py-10 container">
    <h1 class="mb-10 text-xl">
      Receitas
    </h1>
    <p class="mb-4">
      Tags:
    </p>
    <div class="flex flex-wrap cursor-pointer gap-2">
      <NuxtLink v-for="recipeTag in recipesTags" :key="recipeTag" :to="`/recipes/${recipeTag}`">
        <PrimeTag>
          {{ recipeTag }}
        </PrimeTag>
      </NuxtLink>
    </div>
  </section>
</template>
