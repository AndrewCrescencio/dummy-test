<script setup lang="ts">
import type { DataTablePageEvent } from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import { ref, watch } from 'vue'
import type { UserResponse } from '~/types/api/users/UserResponse.type'

const runtimeConfigs = useRuntimeConfig()
const page = ref(1)
const users = ref<any[]>([])
const numberLoadedItems = ref(0)
const loading = ref(false)

const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'firstName': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'gender': { value: null, matchMode: FilterMatchMode.EQUALS },
  'address.state': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

async function fetchUsers() {
  try {
    loading.value = true
    const { users: data } = await $fetch<UserResponse>(`${runtimeConfigs.public.apiBaseUrl}/users?sortBy=firstName&order=asc&limit=50&page=${page.value}`)

    if (data) {
      users.value = [...users.value, ...data]
      numberLoadedItems.value += data.length
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
}

function onPaginate(e: DataTablePageEvent) {
  const isLastPage = (e.page + 1) * e.rows >= numberLoadedItems.value

  if (isLastPage) {
    page.value += 1
    fetchUsers()
  }
}

const { format } = useFormatDate()
const { getLink } = useGoogleMapsLink()

fetchUsers()
</script>

<template>
  <section class="mx-auto py-10 container">
    <h1 class="mb-10 text-xl">
      Users
    </h1>
    <div class="card">
      <PrimeDataTable
        v-if="users.length > 0"
        v-model:filters="filters"
        :value="users"
        paginator
        :rows="5"
        :rows-per-page-options="[5, 10, 20, 50]"
        table-style="min-width: 50rem"
        :loading="loading"
        :global-filter-fields="['firstName', 'address.state', 'email', 'status']"
        @page="onPaginate"
      >
        <template #header>
          <PrimeInputText
            v-model="filters.global.value"
            class="max-sm:w-full"
            placeholder="Search user"
          />
        </template>

        <PrimeColumn header="Full Name">
          <template #body="{ data: tableData }">
            <div class="flex items-center gap-2">
              <img :src="`${tableData.image}`" :alt="tableData.image" class="h-8 w-8 rounded-full">
              <p>{{ `${tableData.firstName} ${tableData.maidenName ? `${tableData.maidenName} ` : ''}${tableData.lastName}` }}</p>
            </div>
          </template>
        </PrimeColumn>

        <PrimeColumn field="birthDate" header="BirthDate">
          <template #body="{ data: tableData }">
            <p>{{ format(tableData.birthDate) }}</p>
          </template>
        </PrimeColumn>

        <PrimeColumn field="gender" header="Gender" />

        <PrimeColumn field="address.state" header="State">
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
    </div>
  </section>
</template>
