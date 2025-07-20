import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock'
import { User } from '../../../../src/enigma/domain/user'
import { Nonce } from '../../../../src/enigma/domain/value-objects/nonce'
import { Time } from '../../../../src/enigma/domain/value-objects/time'
import { JWTProviderMock } from '../../__mocks__/JWTProviderMock'
import { SignatureVerifierMock } from '../../__mocks__/signatureVerifierMock'
import { AuthenticateChallenge } from '../../../../src/enigma/application/authentication/authenticateChallenge'

let userRepository: UserRepositoryMock
let signatureVerifier: SignatureVerifierMock
let jwtProvider: JWTProviderMock
let useCase: AuthenticateChallenge

beforeEach(() => {
    userRepository = new UserRepositoryMock()
    signatureVerifier = new SignatureVerifierMock()
    jwtProvider = new JWTProviderMock()
    useCase = new AuthenticateChallenge()
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Authenticate challenge', () => {
    it('Should generate a JWT token with user information when a valid signature and nonce are received', async () => {
        const nonce = new Nonce('random_string', Time.now())
        const user = new User('uuid', 'John Doe', 'public_key', nonce)

        userRepository.returnOnFind(user)
        jwtProvider.returnOnSignUser('token')

        const token = useCase.execute({
            id: 'uuid',
            nonce: 'random_string',
            signature: 'signature'
        })

        signatureVerifier.assertVerifyNonceHaveBeenCalledWith(nonce, 'public_key', 'signature')
        expect(token).toBe('token')
    })
})
