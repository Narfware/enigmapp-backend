import { describe, it, beforeEach, afterEach, vi } from 'vitest'
import { User } from '../../../../src/enigma/domain/user'
import { CreateUser } from '../../../../src/enigma/application/commands/createUser'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'
import { Nonce } from '../../../../src/enigma/domain/value-objects/nonce'
import { Time } from '../../../../src/enigma/domain/value-objects/time'
import { NonceGeneratorMock } from '../../__mocks__/nonceGeneratorMock'

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
        const nonce = new Nonce('random_string', Time.now())
        nonceGenerator.returnOnGenerate(nonce)

        const expected_user = new User('uuid', 'John Doe', 'publicKey', nonce)

        await useCase.execute({
            id: 'uuid',
            nickName: 'John Doe',
            publicKey: 'publicKey'
        })

        userRepository.assertSaveHaveBeenCalledWith(expected_user)
    })
})
