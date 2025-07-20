import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'

import { JWTProviderMock } from '../../__mocks__/JWTProviderMock'
import { SignatureVerifierMock } from '../../__mocks__/signatureVerifierMock'
import { AuthenticateChallenge } from '../../../../src/enigma/application/authentication/authenticateChallenge'
import { UserMother } from '../../domain/UserMother'
import { NonceMother } from '../../domain/NonceMother'

let userRepository: UserRepositoryMock
let signatureVerifier: SignatureVerifierMock
let jwtProvider: JWTProviderMock
let useCase: AuthenticateChallenge

beforeEach(() => {
    userRepository = new UserRepositoryMock()
    signatureVerifier = new SignatureVerifierMock()
    jwtProvider = new JWTProviderMock()
    useCase = new AuthenticateChallenge(userRepository, signatureVerifier, jwtProvider)
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
})
