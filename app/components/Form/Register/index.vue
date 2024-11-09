<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { date, number, object, string } from 'yup'
import { isCpfValid } from '~/utils/isCpfValid'

const listCatBreed = ref(['Persa', 'Siamês', 'Maine Coon', 'Sphynx', 'Ragdoll'])
const listDogBreed = ref(['Labrador Retriever', 'Bulldog', 'Poodle', 'Shih Tzu', 'Golden Retriever'])

const schema = object({
  dateOfBirth: date().nullable().test('age', 'Você deve ter 18 anos ou mais', (birthdate) => {
    const cutoff = new Date()
    cutoff.setFullYear(cutoff.getFullYear() - 18)
    if (!birthdate) {
      return false
    }
    return birthdate <= cutoff
  }),

  fullName: string().matches(/^\S+(\s+\S+)+$/, 'O campo deve conter nome e sobrenome').max(70, 'Limite de 70 caracteres').required('Campo obrigatório'),
  // TODO: melhorar validação do cpf
  cpf: string().required('Campo obrigatório').test('cpf', 'cpf inválido', (cpf) => {
    return isCpfValid(cpf)
  }),
  petSpecie: string().required('Campo obrigatório').oneOf(['cão', 'gato']),
  petBreed: string().required('Campo obrigatório').oneOf([...listDogBreed.value, ...listCatBreed.value, 'outro'], 'Campo obrigatório'),
  petBreedName: string().test({
    name: 'petBreedName',
    message: 'Campo obrigatório',
    test: (value, context) => {
      return context.parent.petBreed !== 'outro' || Boolean(value)
    },
  }),
  monthlyIncome: number().required('Campo obrigatório').positive('Precisa ser um valor positivo').moreThan(999.99, 'O mínimo permitido é R$ 1000,00'),
  cep: string().required('Campo obrigatório').min(8, 'Formato de CEP inválido.'),
  street: string().required('Campo obrigatório'),
  neighborhood: string().required('Campo obrigatório'),
  city: string().required('Campo obrigatório'),
  state: string().required('Campo obrigatório'),
})

const { defineField, errors, setFieldValue, handleSubmit, handleReset } = useForm({ validationSchema: schema })

const [dateOfBirth] = defineField('dateOfBirth')
const [fullName] = defineField('fullName')
const [cpf] = defineField('cpf')
const [petSpecie] = defineField('petSpecie')
const [petBreed] = defineField('petBreed')
const [petBreedName] = defineField('petBreedName')
const [monthlyIncome] = defineField('monthlyIncome')
const [cep] = defineField('cep')
const [street] = defineField('street')
const [neighborhood] = defineField('neighborhood')
const [city] = defineField('city')
const [state] = defineField('state')

const listPetSpecie = ['cão', 'gato']
const listPetBreed = computed(() => {
  return petSpecie.value === 'cão' ? [...listDogBreed.value, 'outro'] : [...listCatBreed.value, 'outro']
})

watch(
  () => petSpecie.value,
  () => {
    setFieldValue('petBreed', '')
  },
)

const modalRef = ref()
const formValues = ref()

const onSubmit = handleSubmit((values) => {
  modalRef.value.openModal()
  formValues.value = values
})

const toast = useToast()

const isSearchingCep = ref(false)

async function searchCep(cep: string) {
  try {
    isSearchingCep.value = true
    const { data } = await $fetch('/api/cep', { params: { cep } })
    if (data.erro) {
      toast.add({ severity: 'error', detail: 'Formato de CEP inválido.', life: 2500 })
      setFieldValue('cep', '')
    }
    if (data) {
      setFieldValue('street', data.logradouro)
      setFieldValue('neighborhood', data.bairro)
      setFieldValue('city', data.localidade)
      setFieldValue('state', data.uf)
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isSearchingCep.value = false
  }
}

function handleSearchCep() {
  if (cep.value) {
    searchCep(cep.value)
  }
}

function onConfirm() {
  modalRef.value.closeModal()
  toast.add({ severity: 'success', detail: 'Formulário "enviado" com sucesso!', life: 2500 })
  handleReset()
}

function onCancel() {
  modalRef.value.closeModal()
  toast.add({ severity: 'error', detail: 'Envio de formulário cancelado.', life: 2500 })
}
</script>

<template>
  <form class="space-y-9" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-4">
      <div class="relative col-span-1 pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputText id="form_name" v-model="fullName" class="w-full" autocomplete="name" maxlength="70" type="text" :class="{ 'p-invalid': errors.fullName }" />
          <label for="form_name">Nome Completo</label>
        </PrimeFloatLabel>
        <small v-if="errors.fullName" id="fullName-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.fullName }}
        </small>
      </div>

      <div class="relative col-span-1 pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputMask id="form_cpf" v-model="cpf" class="w-full" autocomplete="cpf" mask="999.999.999-99" :unmask="true" :class="{ 'p-invalid': errors.cpf }" />
          <label for="form_cpf">CPF</label>
        </PrimeFloatLabel>
        <small v-if="errors.cpf" id="cpf-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.cpf }}
        </small>
      </div>

      <div class="relative col-span-1 pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeDatePicker id="form_dateOfBirth" v-model="dateOfBirth" class="w-full" date-format="dd/mm/yy" :class="{ 'p-invalid': errors.dateOfBirth }" :invalid="!!errors.dateOfBirth" />
          <label for="form_dateOfBirth">Data de nascimento</label>
        </PrimeFloatLabel>
        <small v-if="errors.dateOfBirth" id="dateOfBirth-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.dateOfBirth }}
        </small>
      </div>

      <div class="relative col-span-1 pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputNumber
            v-model="monthlyIncome"
            :min="0" :max="9000000000000" input-id="form_monthlyIncome" mode="currency" currency="BRL"
            currency-display="symbol" locale="pt-BR" fluid :invalid="!!errors.monthlyIncome" :class="{ 'p-invalid': errors.monthlyIncome }"
          />
          <label for="form_monthlyIncome">Renda mensal</label>
        </PrimeFloatLabel>
        <small v-if="errors.monthlyIncome" id="monthlyIncome-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.monthlyIncome }}
        </small>
      </div>
    </div>

    <div class="grid gap-x-3 gap-y-8 md:grid-cols-4">
      <div class="relative pb-5 md:col-span-2" :class="{ '!md:col-span-1': petBreed === 'outro' }">
        <PrimeFloatLabel>
          <PrimeSelect id="form_cpf" v-model="petSpecie" class="w-full" :options="listPetSpecie" :class="{ 'p-invalid': errors.petSpecie }" />
          <label for="form_cpf">Espécie do pet</label>
        </PrimeFloatLabel>
        <small v-if="errors.petSpecie" id="petSpecie-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.petSpecie }}
        </small>
      </div>

      <div class="relative pb-5 md:col-span-2" :class="{ '!md:col-span-1': petBreed === 'outro' }">
        <PrimeFloatLabel>
          <PrimeSelect id="petBreed" v-model="petBreed" class="w-full" :options="listPetBreed" :class="{ 'p-invalid': errors.petBreed }" />
          <label for="petBreed">Raça do pet</label>
        </PrimeFloatLabel>
        <small v-if="errors.petBreed" id="petBreed-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.petBreed }}
        </small>
      </div>

      <div v-if="petBreed === 'outro'" class="relative pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputText id="petBreedName" v-model="petBreedName" maxlength="50" class="w-full" type="text" :class="{ 'p-invalid': errors.petBreedName }" />
          <label for="petBreedName">Nome da raça do pet</label>
        </PrimeFloatLabel>

        <small v-if="errors.petBreedName" id="petBreedName-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.petBreedName }}
        </small>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-4">
      <div class="relative pb-5 md:col-span-1">
        <PrimeInputGroup label="CEP" name="cep">
          <PrimeFloatLabel>
            <PrimeInputMask id="form_cep" v-model="cep" mask="99999-999" :unmask="true" :class="{ 'p-invalid': errors.cep }" @blur="handleSearchCep" />
            <label for="form_cep">CEP</label>
          </PrimeFloatLabel>
          <PrimeButton icon="i-tabler-search" severity="info" :disabled="isSearchingCep" @click.prevent="handleSearchCep" />
        </PrimeInputGroup>
        <small v-if="errors.cep" id="cep-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.cep }}
        </small>
      </div>

      <div class="relative pb-5 md:col-span-1">
        <PrimeFloatLabel>
          <PrimeInputText id="form_state" v-model="state" class="w-full uppercase placeholder:uppercase" placeholder="UF" maxlength="2" type="text" :class="{ 'p-invalid': errors.state }" />
          <label for="form_state"><span class="sr-only">sigla UF Estado</span>UF</label>
        </PrimeFloatLabel>
        <small v-if="errors.state" id="state-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.state }}
        </small>
      </div>

      <div class="relative pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputText id="form_street" v-model="street" class="w-full" maxlength="70" type="text" :class="{ 'p-invalid': errors.street }" />
          <label for="form_street">Rua</label>
        </PrimeFloatLabel>
        <small v-if="errors.street" id="street-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.street }}
        </small>
      </div>

      <div class="relative pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputText id="form_city" v-model="city" class="w-full" maxlength="70" type="text" :class="{ 'p-invalid': errors.city }" />
          <label for="form_city">Cidade</label>
        </PrimeFloatLabel>
        <small v-if="errors.city" id="city-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.city }}
        </small>
      </div>

      <div class="relative pb-5 md:col-span-2">
        <PrimeFloatLabel>
          <PrimeInputText id="form_neighborhood" v-model="neighborhood" class="w-full" maxlength="70" type="text" :class="{ 'p-invalid': errors.neighborhood }" />
          <label for="form_neighborhood">Bairro</label>
        </PrimeFloatLabel>
        <small v-if="errors.neighborhood" id="neighborhood-help" class="p-error absolute z-1 mt-1 text-xs">
          {{ errors.neighborhood }}
        </small>
      </div>
    </div>

    <PrimeButton type="submit" severity="info" class="w-full !block">
      Submit
    </PrimeButton>
  </form>
  <AppDialog ref="modalRef" title="Verificar dados">
    <CardCheckForm :form-data="formValues" @confirm="onConfirm" @cancel="onCancel" />
  </AppDialog>
</template>
