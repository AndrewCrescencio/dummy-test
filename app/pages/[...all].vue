<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <section p="x4 y10" text="center">
    <div text-4xl>
      <div i-tabler-alert-circle inline-block />
    </div>
    <p>página não encontrada</p>
    <prime-button m="3 t8" @click="router.back()">
      voltar
    </prime-button>
  </section>
</template>
