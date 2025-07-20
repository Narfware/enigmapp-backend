import { Nonce } from '../value-objects/nonce'

export interface SignatureVerifier {
    verifyNonce(nonce: Nonce, publicKey: string, signature: string): void
}
