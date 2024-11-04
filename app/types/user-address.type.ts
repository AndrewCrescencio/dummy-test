import type { Coordinates } from './coordinates.type'

export interface UserAddress {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}
