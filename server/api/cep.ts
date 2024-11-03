import type { Cep } from '~/types/viacep/cep.type'

export default defineEventHandler(async (event) => {
  const { cep } = getQuery(event)

  const config = useRuntimeConfig(event)
  const API_URL = config.public.apiViaCepUrl

  try {
    const url = `${API_URL}/${cep}/json/`
    const data = await $fetch<Cep>(url)
    return { data }
  }
  catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      message: 'Formato de CEP inválido.',
    })
  }
})
