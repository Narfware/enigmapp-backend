import { SignatureVerifier } from '../domain/interfaces/signatureVerifier'
import { Nonce } from '../domain/value-objects/nonce'
import { verify } from 'crypto'

export class NodeCryptoSignatureVerifier implements SignatureVerifier {
    checkIsValidSignatureForNonce(nonce: Nonce, publicKey: string, signature: string): { isValidSignature: boolean } {
        const isValidSignature = verify('sha256', Buffer.from(nonce.value), publicKey, Buffer.from(signature, 'base64'))

        return { isValidSignature }
    }
}
