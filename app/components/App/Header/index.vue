<script setup>
const items = ref([
  {
    label: 'Formulário',
    route: '/',
    icon: 'i-tabler-edit',
  },
  {
    label: 'Receitas',
    route: '/recipes',
    icon: 'i-tabler-chef-hat',
  },
  {
    label: 'Usuários',
    route: '/users',
    icon: 'i-tabler-user',
  },
])
</script>

<template>
  <header class="fixed left-0 top-0 z-10 w-screen">
    <PrimeMenubar :model="items" class="navbar mx-auto container">
      <template #item="{ item, props, hasSubmenu }">
        <nuxt-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <i v-if="item.icon" :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </nuxt-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span v-if="item.icon" :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </PrimeMenubar>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--p-menubar-background);
  border-bottom: 1px solid var(--p-menubar-border-color);
}
:deep(.navbar) {
  border: none;
}
</style>
