import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'
import { User } from '../../../../src/enigma/domain/user'
import { GenerateChallenge } from '../../../../src/enigma/application/commands/generateChallenge'
import { NonceGeneratorMock } from '../../__mocks__/nonceGeneratorMock'

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

describe('Retrieve challenge', () => {
    it('Should create a challenge for user', async () => {
        const expected_nonce = 'random_string'
        const user = new User('uuid', 'John Doe', 'publicKey')

        vi.spyOn(userRepository, 'find').mockResolvedValue(user)
        vi.spyOn(nonceGenerator, 'generate').mockReturnValue(expected_nonce)

        const nonce = await useCase.execute('uuid')

        expect(nonce).toBe(expected_nonce)
    })
})
