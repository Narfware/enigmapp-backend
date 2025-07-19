import { NonceGenerator } from '../domain/interfaces/nonceGenerator'
import { randomBytes } from 'crypto'
import { TimeProvider } from '../domain/interfaces/timeProvider'
import { Nonce } from '../domain/value-objects/nonce'

export class NodeCryptoNonceGenerator implements NonceGenerator {
    constructor(private timeProvider: TimeProvider) {}

    generate(): Nonce {
        const randomStringInBase64 = randomBytes(16).toString('base64')
        return new Nonce(randomStringInBase64, this.timeProvider.now())
    }
}
