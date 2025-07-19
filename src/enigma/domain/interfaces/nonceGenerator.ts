import { Nonce } from '../value-objects/nonce'

export interface NonceGenerator {
    generate(): Nonce
}
