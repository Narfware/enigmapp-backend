import { User } from '../user'

export interface JWTProvider {
    signUser(user: User): string
}
