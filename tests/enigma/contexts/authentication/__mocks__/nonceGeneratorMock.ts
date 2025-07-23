import { Mock, vi } from 'vitest'
import { NonceGenerator } from '../../../../../src/enigma/contexts/authentication/domain/interfaces/nonceGenerator'
import { Nonce } from '../../../../../src/enigma/contexts/authentication/domain/value-objects/nonce'
import { NonceMother } from '../domain/NonceMother'

export class NonceGeneratorMock implements NonceGenerator {
    private generateMock: Mock
    private nonce?: Nonce

    constructor() {
        this.generateMock = vi.fn()
    }

    returnOnGenerate(nonce: Nonce) {
        this.nonce = nonce
    }

    generate(): Nonce {
        this.generateMock()

        if (!this.nonce) return NonceMother.create()

        return this.nonce
    }
}
