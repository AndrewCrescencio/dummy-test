export function useFormatDate() {
  function format(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number)
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
  }
  return { format }
}
