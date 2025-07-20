import { expect, Mock, vi } from 'vitest'
import { SignatureVerifier } from '../../../src/enigma/domain/interfaces/signatureVerifier'
import { Nonce } from '../../../src/enigma/domain/value-objects/nonce'

export class SignatureVerifierMock implements SignatureVerifier {
    private verifyNonceMock: Mock

    constructor() {
        this.verifyNonceMock = vi.fn()
    }

    verifyNonce(nonce: Nonce, publicKey: string, signature: string): void {
        this.verifyNonceMock(nonce, publicKey, signature)
    }

    assertVerifyNonceHaveBeenCalledWith(
        expectedNonce: Nonce,
        expectedPublicKey: string,
        expectedSignature: string
    ): void {
        expect(this.verifyNonceMock).toHaveBeenCalledWith(expectedNonce, expectedPublicKey, expectedSignature)
    }
}
