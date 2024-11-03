import type { User } from '~/types/user.type'

export interface UserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
