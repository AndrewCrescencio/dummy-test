import type { UserAddress } from '~/types/user-address.type'

export function useGoogleMapsLink() {
  function getLink(address: UserAddress) {
    const query = encodeURIComponent(`${address.city}, ${address.state}`)
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  }
  return { getLink }
}
