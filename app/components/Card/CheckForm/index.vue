<script setup lang="ts">
interface FormData {
  fullName: string
  dateOfBirth: string
  cpf: string
  petSpecie: string
  petBreed: string
  petBreedName?: string
  monthlyIncome: number
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
}

defineProps<{
  formData: FormData
}>()

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>

<template>
  <PrimeCard>
    <template #content>
      <p><strong>Nome Completo:</strong> {{ formData.fullName }}</p>
      <p><strong>Data de Nascimento:</strong> {{ formData.dateOfBirth }}</p>
      <p><strong>CPF:</strong> {{ formData.cpf }}</p>
      <p><strong>Espécie do Pet:</strong> {{ formData.petSpecie }}</p>
      <p><strong>Raça do Pet:</strong> {{ formData.petBreed }}</p>
      <p v-if="formData.petBreed === 'outro'">
        <strong>Nome da Raça:</strong> {{ formData.petBreedName }}
      </p>
      <p><strong>Renda Mensal:</strong> {{ formData.monthlyIncome }}</p>
      <p><strong>CEP:</strong> {{ formData.cep }}</p>
      <p><strong>Rua:</strong> {{ formData.street }}</p>
      <p><strong>Bairro:</strong> {{ formData.neighborhood }}</p>
      <p><strong>Cidade:</strong> {{ formData.city }}</p>
      <p><strong>Estado:</strong> {{ formData.state }}</p>
    </template>
    <template #footer>
      <PrimeButton label="Confirmar" @click="confirm" />
      <PrimeButton label="Cancelar" class="ml-2" @click="cancel" />
    </template>
  </PrimeCard>
</template>
