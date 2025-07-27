import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { Auth0JWTProvider } from '../../../../../src/enigma/contexts/authentication/infrastructure/auth0JwtProvider'
import { UserMother } from '../domain/UserMother'
import jwt from 'jsonwebtoken'

let jwtProvider: Auth0JWTProvider

beforeEach(() => {
    jwtProvider = new Auth0JWTProvider()
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Auth0 JWT provider', () => {
    it('Should sign and create JWT with the user info', async () => {
        const user = UserMother.create()

        const token = jwtProvider.signUser(user)
        const decodedToken = jwt.decode(token, { json: true })

        if (!decodedToken) throw Error('Decode token failed')

        expect(decodedToken.uuid).toBe('uuid')
    })
})
