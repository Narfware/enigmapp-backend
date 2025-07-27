import { JWTProvider } from '../domain/interfaces/JWTProvider'
import { User } from '../domain/user'
import jwt from 'jsonwebtoken'

export class Auth0JWTProvider implements JWTProvider {
    signUser(user: User): string {
        const privateKey = process.env.JWT_PRIVATE_KEY

        if (!privateKey) throw new Error('Missing JWT private key')

        const { id } = user.toPrimitives()
        const token = jwt.sign({ sub: id }, privateKey, {
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer: 'enigma',
            audience: 'enigma-app'
        })

        return token
    }
}
