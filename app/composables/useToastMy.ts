import { useToast } from 'primevue/usetoast'

interface ToastOptions {
  severity?: 'success' | 'info' | 'warn' | 'error'
  summary?: string
  detail?: string
  life?: number
  closable?: boolean
  //   sticky?: boolean
  group?: string
}

export function useToastService() {
  const toast = useToast()

  const showToast = (options: ToastOptions) => {
    toast.add({
      severity: options.severity || 'info',
      summary: options.summary || '',
      detail: options.detail || '',
      life: options.life || 3000,
      closable: options.closable !== false,
      //   sticky: options.sticky || false,
      group: options.group || '',
    })
  }

  return { showToast }
}
