import { JWTProvider } from '../domain/interfaces/JWTProvider'
import { User } from '../domain/user'
import jwt from 'jsonwebtoken'

export class Auth0JWTProvider implements JWTProvider {
    signUser(user: User): string {
        const token = jwt.sign({ uuid: user.toPrimitives().id }, 'privateKey')
        return token
    }
}
