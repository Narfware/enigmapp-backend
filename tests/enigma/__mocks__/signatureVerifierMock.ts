import { expect, Mock, vi } from 'vitest'
import { SignatureVerifier } from '../../../src/enigma/domain/interfaces/signatureVerifier'
import { Nonce } from '../../../src/enigma/domain/value-objects/nonce'

export class SignatureVerifierMock implements SignatureVerifier {
    private verifyNonceMock: Mock
    private isValidSignature?: boolean

    constructor() {
        this.verifyNonceMock = vi.fn()
    }

    checkIsValidSignatureForNonce(nonce: Nonce, publicKey: string, signature: string): { isValidSignature: boolean } {
        this.verifyNonceMock(nonce, publicKey, signature)

        return { isValidSignature: this.isValidSignature || false }
    }

    returnOnCheckIsValidSignatureForNonce(isValidSignature: boolean) {
        this.isValidSignature = isValidSignature
    }

    assertVerifyNonceHaveBeenCalledWith(
        expectedNonce: Nonce,
        expectedPublicKey: string,
        expectedSignature: string
    ): void {
        expect(this.verifyNonceMock).toHaveBeenCalledWith(expectedNonce, expectedPublicKey, expectedSignature)
    }
}
