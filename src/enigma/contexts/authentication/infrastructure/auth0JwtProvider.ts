import { JWTProvider } from '../domain/interfaces/JWTProvider'
import { User } from '../domain/user'

export class Auth0JWTProvider implements JWTProvider {
    signUser(user: User): string {}
}
