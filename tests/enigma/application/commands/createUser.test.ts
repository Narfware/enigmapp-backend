import { describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CreateUser } from '../../../../src/enigma/application/commands/createUser'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'
import { NonceGeneratorMock } from '../../__mocks__/nonceGeneratorMock'
import { NonceMother } from '../../domain/NonceMother'
import { User } from '../../../../src/enigma/domain/user'

let userRepository: UserRepositoryMock
let nonceGenerator: NonceGeneratorMock
let useCase: CreateUser

beforeEach(() => {
    userRepository = new UserRepositoryMock()
    nonceGenerator = new NonceGeneratorMock()
    useCase = new CreateUser(userRepository, nonceGenerator)
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Create enigma user', () => {
    it('Should create an enigma user', async () => {
        const nonce = NonceMother.create()
        nonceGenerator.returnOnGenerate(nonce)

        await useCase.execute({
            id: 'uuid',
            nickName: 'John Doe',
            publicKey: 'public_key'
        })

        userRepository.assertSaveHaveBeenCalledWith(new User('uuid', 'John Doe', 'public_key', nonce))
    })
})
