import { NonceGenerator } from '../../../src/enigma/domain/nonceGenerator'

export class NonceGeneratorMock implements NonceGenerator {
    generate(): string {
        return 'random_string'
    }
}
