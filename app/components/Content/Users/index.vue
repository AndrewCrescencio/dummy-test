<script setup lang="ts">
import type { DataTablePageEvent } from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import { ref } from 'vue'
import type { UserResponse } from '~/types/api/users/UserResponse.type'

const runtimeConfigs = useRuntimeConfig()
const users = ref<any[]>([])
const numberLoadedItems = ref(0)
const loading = ref(false)
const totalUsers = ref(0)
const skip = ref(0)
const limit = ref(50)
const isSearch = ref(false)
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'firstName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'gender': { value: null, matchMode: FilterMatchMode.EQUALS },
  'address.state': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

async function fetchUsers(query = '', reset = false) {
  try {
    loading.value = true
    const url = query
      ? `${runtimeConfigs.public.apiBaseUrl}/users/search?q=${query}&skip=${skip.value}&limit=${limit.value}`
      : `${runtimeConfigs.public.apiBaseUrl}/users?sortBy=firstName&order=asc&skip=${skip.value}&limit=${limit.value}`
    isSearch.value = !!query
    const response = await $fetch<UserResponse>(url)

    if (response.users) {
      if (reset) {
        users.value = response.users
        skip.value = limit.value
        skip.value = limit.value
      }
      else {
        users.value = [...users.value, ...response.users]
        skip.value += limit.value
      }
      totalUsers.value = response.total
      numberLoadedItems.value = users.value.length
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
}
const searchInput = ref('')

function onPaginate(e: DataTablePageEvent) {
  const needToLoadMore = (e.page + 1) * e.rows >= numberLoadedItems.value && numberLoadedItems.value < totalUsers.value
  if (needToLoadMore) {
    fetchUsers()
  }
}

const { format } = useFormatDate()
const { getLink } = useGoogleMapsLink()

function onSearch() {
  skip.value = 0
  fetchUsers(searchInput.value, true)
}

function clearSearch() {
  skip.value = 0
  searchInput.value = ''
  fetchUsers('', true)
}

fetchUsers()
</script>

<template>
  <section class="mx-auto py-10 container">
    <h1 class="mb-10 text-xl">
      Usuários
    </h1>
    <PrimeDataTable
      v-model:filters="filters"
      :value="users"
      paginator
      :total-records="numberLoadedItems"
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
      :loading="loading"
      :global-filter-fields="['firstName', 'address.state', 'email', 'status']"
      @page="onPaginate"
    >
      <template #empty>
        <p class="text-center">
          {{ isSearch ? `Não foi encontrado nenhum usuário` : 'Sem usuários cadastrados' }}
        </p>
      </template>
      <template #header>
        <PrimeInputGroup class="lg:max-w-md">
          <PrimeInputText
            v-model.trim="searchInput"
            placeholder="Pesquise um usuário"
            @keyup.enter="onSearch"
          />
          <PrimeButton v-if="isSearch" label="Limpar pesquisa" variant="outlined" @click="clearSearch">
            <i class="i-tabler-x" />
          </PrimeButton>
          <PrimeButton label="Botão para pesquisar" @click="onSearch">
            <i class="i-tabler-search" />
          </PrimeButton>
        </PrimeInputGroup>
      </template>

      <PrimeColumn header="Nome completo">
        <template #body="{ data: tableData }">
          <div class="flex items-center gap-2">
            <img :src="`${tableData.image}`" :alt="tableData.image" class="h-8 w-8 rounded-full">
            <p>{{ `${tableData.firstName} ${tableData.maidenName ? `${tableData.maidenName} ` : ''}${tableData.lastName}` }}</p>
          </div>
        </template>
      </PrimeColumn>

      <PrimeColumn field="birthDate" header="Data de nascimento">
        <template #body="{ data: tableData }">
          <p>{{ format(tableData.birthDate) }}</p>
        </template>
      </PrimeColumn>

      <PrimeColumn field="gender" header="Gênero" />

      <PrimeColumn field="address.state" header="Estado">
        <template #body="{ data: tableData }">
          <div class="flex items-center gap-2">
            <p>{{ tableData.address.state }}</p>
            <a
              :href="getLink(tableData.address.coordinates.lat, tableData.address.coordinates.lng)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">
                Abrir localização no Google Maps
              </span>
              <div class="i-tabler-map-pin" />
            </a>
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </section>
</template>
