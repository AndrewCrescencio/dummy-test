<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { date, type InferType, number, object, string } from 'yup'

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
  cpf: string().required('Campo obrigatório'),
  petSpecie: string().required('Campo obrigatório').oneOf(['cão', 'gato']),
  petBreed: string().required('Campo obrigatório').oneOf([...listDogBreed.value, ...listCatBreed.value, 'outro']),
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
    <PrimeInputGroup>
      <PrimeFloatLabel>
        <PrimeDatePicker id="form_dateOfBirth" v-model="dateOfBirth" date-format="dd/mm/yy" :class="{ 'p-invalid': errors.dateOfBirth }" :invalid="!!errors.dateOfBirth" />
        <label for="form_dateOfBirth">Data de nascimento</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.dateOfBirth" id="dateOfBirth-help" class="p-error">
      {{ errors.dateOfBirth }}
    </small>

    <PrimeInputGroup>
      <PrimeFloatLabel>
        <PrimeInputText id="form_name" v-model="fullName" autocomplete="name" maxlength="70" type="text" :class="{ 'p-invalid': errors.fullName }" />
        <label for="form_name">Nome Completo</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.fullName" id="fullName-help" class="p-error">
      {{ errors.fullName }}
    </small>

    <PrimeInputGroup label="CPF" name="cpf">
      <PrimeFloatLabel>
        <PrimeInputMask id="form_cpf" v-model="cpf" autocomplete="cpf" mask="999.999.999-99" :unmask="true" :class="{ 'p-invalid': errors.cpf }" />
        <label for="form_cpf">CPF</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.cpf" id="cpf-help" class="p-error">
      {{ errors.cpf }}
    </small>

    <PrimeInputGroup label="Espécie do pet" name="petSpecie">
      <PrimeSelect v-model="petSpecie" :options="listPetSpecie" placeholder="Espécie do pet" :class="{ 'p-invalid': errors.petSpecie }" />
    </PrimeInputGroup>
    <small v-if="errors.petSpecie" id="petSpecie-help" class="p-error">
      {{ errors.petSpecie }}
    </small>

    <PrimeInputGroup label="Raça do pet" name="petBreed">
      <PrimeSelect v-model="petBreed" :options="listPetBreed" placeholder="Raça do pet" :class="{ 'p-invalid': errors.petBreed }" />
    </PrimeInputGroup>
    <small v-if="errors.petBreed" id="petBreed-help" class="p-error">
      {{ errors.petBreed }}
    </small>

    <PrimeInputGroup v-if="petBreed === 'outro'" label="Nome da raça do pet" name="petBreedName">
      <PrimeInputText v-model="petBreedName" maxlength="50" placeholder="Nome da raça" type="text" :class="{ 'p-invalid': errors.petBreedName }" />
    </PrimeInputGroup>
    <small v-if="errors.petBreedName" id="petBreedName-help" class="p-error">
      {{ errors.petBreedName }}
    </small>

    <PrimeInputGroup label="Renda mensal" name="monthlyIncome">
      <PrimeFloatLabel>
        <PrimeInputNumber
          v-model="monthlyIncome"
          :min="0" :max="9000000000000" input-id="form_monthlyIncome" mode="currency" currency="BRL"
          currency-display="symbol" locale="pt-BR" fluid :invalid="!!errors.monthlyIncome" :class="{ 'p-invalid': errors.monthlyIncome }"
        />
        <label for="form_monthlyIncome">Renda mensal</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.monthlyIncome" id="monthlyIncome-help" class="p-error">
      {{ errors.monthlyIncome }}
    </small>

    <PrimeInputGroup label="CEP" name="cep">
      <PrimeFloatLabel>
        <PrimeInputMask id="form_cep" v-model="cep" mask="99999-999" :unmask="true" :class="{ 'p-invalid': errors.cep }" @blur="handleSearchCep" />
        <label for="form_cep">CEP</label>
      </PrimeFloatLabel>
      <PrimeButton icon="i-tabler-search" severity="info" :disabled="isSearchingCep" @click.prevent="handleSearchCep" />
    </PrimeInputGroup>
    <small v-if="errors.cep" id="cep-help" class="p-error">
      {{ errors.cep }}
    </small>

    <PrimeInputGroup>
      <PrimeFloatLabel>
        <PrimeInputText id="form_street" v-model="street" maxlength="70" type="text" :class="{ 'p-invalid': errors.street }" />
        <label for="form_street">Rua</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.street" id="street-help" class="p-error">
      {{ errors.street }}
    </small>

    <PrimeInputGroup>
      <PrimeFloatLabel>
        <PrimeInputText id="form_neighborhood" v-model="neighborhood" maxlength="70" type="text" :class="{ 'p-invalid': errors.neighborhood }" />
        <label for="form_neighborhood">Bairro</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.neighborhood" id="neighborhood-help" class="p-error">
      {{ errors.neighborhood }}
    </small>

    <PrimeInputGroup>
      <PrimeFloatLabel>
        <PrimeInputText id="form_city" v-model="city" maxlength="70" type="text" :class="{ 'p-invalid': errors.city }" />
        <label for="form_city">Cidade</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.city" id="city-help" class="p-error">
      {{ errors.city }}
    </small>

    <PrimeInputGroup>
      <PrimeFloatLabel>
        <PrimeInputText id="form_state" v-model="state" class="uppercase placeholder:uppercase" placeholder="UF" maxlength="2" type="text" :class="{ 'p-invalid': errors.state }" />
        <label for="form_state"><span class="sr-only">sigla UF Estado</span>UF</label>
      </PrimeFloatLabel>
    </PrimeInputGroup>
    <small v-if="errors.state" id="state-help" class="p-error">
      {{ errors.state }}
    </small>

    <PrimeButton type="submit" severity="info" class="w-full !block">
      Submit
    </PrimeButton>
  </form>
  <AppDialog ref="modalRef" title="Verificar dados">
    <CardCheckForm :form-data="formValues" @confirm="onConfirm" @cancel="onCancel" />
  </AppDialog>
</template>
