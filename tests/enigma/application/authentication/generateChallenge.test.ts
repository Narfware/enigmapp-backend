import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'
import { User } from '../../../../src/enigma/domain/user'
import { GenerateChallenge } from '../../../../src/enigma/application/authentication/generateChallenge'
import { NonceGeneratorMock } from '../../__mocks__/nonceGeneratorMock'
import { Nonce } from '../../../../src/enigma/domain/value-objects/nonce'
import { Time } from '../../../../src/enigma/domain/value-objects/time'
import { UserMother } from '../../domain/UserMother'
import { NonceMother } from '../../domain/NonceMother'

let userRepository: UserRepositoryMock
let nonceGenerator: NonceGeneratorMock
let useCase: GenerateChallenge

beforeEach(() => {
    userRepository = new UserRepositoryMock()
    nonceGenerator = new NonceGeneratorMock()

    useCase = new GenerateChallenge(userRepository, nonceGenerator)
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Generate challenge', () => {
    it('Should generate a nonce and store in the user', async () => {
        const now = Time.now()

        const expected_nonce = NonceMother.create('random_string', now)
        const user = UserMother.create()
        userRepository.returnOnFind(user)
        nonceGenerator.returnOnGenerate(expected_nonce)

        const nonce = await useCase.execute('uuid')
        const userWithNonce = new User('uuid', 'John Doe', 'public_key', new Nonce('random_string', now))

        userRepository.assertSaveHaveBeenCalledWith(userWithNonce)
        expect(nonce).toBe(expected_nonce)
    })
})
