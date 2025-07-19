import { Mock, vi } from 'vitest'
import { NonceGenerator } from '../../../src/enigma/domain/interfaces/nonceGenerator'
import { Nonce } from '../../../src/enigma/domain/value-objects/nonce'
import { Time } from '../../../src/enigma/domain/value-objects/time'

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

        if (!this.nonce) return new Nonce('random_string', Time.now())

        return this.nonce
    }
}
