import { NonceGenerator } from '../domain/interfaces/nonceGenerator'
import { randomBytes } from 'crypto'

export class NodeCryptoNonceGenerator implements NonceGenerator {
    generate(): string {
        return randomBytes(16).toString('base64')
    }
}
