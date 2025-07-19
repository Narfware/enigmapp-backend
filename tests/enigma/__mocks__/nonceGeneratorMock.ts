import { Mock, vi } from 'vitest'
import { NonceGenerator } from '../../../src/enigma/domain/nonceGenerator'

export class NonceGeneratorMock implements NonceGenerator {
    private generateMock: Mock
    private nonce?: string

    constructor() {
        this.generateMock = vi.fn()
    }

    returnOnGenerate(nonce: string) {
        this.nonce = nonce
    }

    generate(): string {
        this.generateMock()

        if (!this.nonce) return 'default_nonce'

        return this.nonce
    }
}
