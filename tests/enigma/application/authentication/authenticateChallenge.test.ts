import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'

import { JWTProviderMock } from '../../__mocks__/JWTProviderMock'
import { SignatureVerifierMock } from '../../__mocks__/signatureVerifierMock'
import { AuthenticateChallenge } from '../../../../src/enigma/application/authentication/authenticateChallenge'
import { UserMother } from '../../domain/UserMother'
import { NonceMother } from '../../domain/NonceMother'
import { NonceGeneratorMock } from '../../__mocks__/nonceGeneratorMock'
import { User } from '../../../../src/enigma/domain/user'
import { InvalidNonce } from '../../../../src/enigma/domain/exceptions/invalidNonce'

let userRepository: UserRepositoryMock
let nonceGenerator: NonceGeneratorMock
let signatureVerifier: SignatureVerifierMock
let jwtProvider: JWTProviderMock
let useCase: AuthenticateChallenge

beforeEach(() => {
    userRepository = new UserRepositoryMock()
    nonceGenerator = new NonceGeneratorMock()
    signatureVerifier = new SignatureVerifierMock()
    jwtProvider = new JWTProviderMock()
    useCase = new AuthenticateChallenge(userRepository, signatureVerifier, jwtProvider, nonceGenerator)
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Authenticate challenge', () => {
    it('Should generate a JWT token with user information when a valid signature and nonce are received', async () => {
        const nonce = NonceMother.create()
        const user = UserMother.create()

        userRepository.returnOnFind(user)
        jwtProvider.returnOnSignUser('token')

        const token = await useCase.execute({
            id: 'uuid',
            nonceValue: 'random_string',
            signature: 'signature'
        })

        signatureVerifier.assertVerifyNonceHaveBeenCalledWith(nonce, 'public_key', 'signature')
        expect(token).toBe('token')
    })

    it('Should generate a new nonce when the current one has been used.', async () => {
        const newNonce = NonceMother.create('new_random_string')
        const user = UserMother.create()

        userRepository.returnOnFind(user)
        nonceGenerator.returnOnGenerate(newNonce)

        await useCase.execute({
            id: 'uuid',
            nonceValue: 'random_string',
            signature: 'signature'
        })

        userRepository.assertSaveHaveBeenCalledWith(new User('uuid', 'John Doe', 'public_key', newNonce))
    })

    it('Should raise an exception when the nonce received does not have the same value', async () => {
        const user = UserMother.create()
        userRepository.returnOnFind(user)

        await expect(
            useCase.execute({
                id: 'uuid',
                nonceValue: 'random_string',
                signature: 'signature'
            })
        ).rejects.toThrowError(InvalidNonce)

        userRepository.assertSaveNotCalled()
    })
})
