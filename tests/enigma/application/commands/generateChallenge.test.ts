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

describe('Generate challenge', () => {
    it('Should generate a nonce and store in the user', async () => {
        const expected_nonce = 'random_string'
        const user = new User('uuid', 'John Doe', 'publicKey')

        const spySave = vi.spyOn(userRepository, 'save')
        vi.spyOn(userRepository, 'find').mockResolvedValue(user)
        vi.spyOn(nonceGenerator, 'generate').mockReturnValue(expected_nonce)

        const nonce = await useCase.execute('uuid')
        const userWithNonce = new User('uuid', 'John Doe', 'publicKey', 'random_string')

        expect(nonce).toBe(expected_nonce)
        expect(spySave).toHaveBeenCalledExactlyOnceWith(userWithNonce)
    })
})
