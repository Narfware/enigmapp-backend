import { SignatureVerifier } from '../domain/interfaces/signatureVerifier'
import { Nonce } from '../domain/value-objects/nonce'

export class NodeCryptoSignatureVerifier implements SignatureVerifier {
    checkIsValidSignatureForNonce(nonce: Nonce, publicKey: string, signature: string): { isValidSignature: boolean } {}
}
