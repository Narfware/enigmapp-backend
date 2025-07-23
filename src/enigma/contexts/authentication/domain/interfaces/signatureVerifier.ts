import { Nonce } from '../value-objects/nonce'

export interface SignatureVerifier {
    checkIsValidSignatureForNonce(nonce: Nonce, publicKey: string, signature: string): { isValidSignature: boolean }
}
