import { Mock, vi } from 'vitest'
import { JWTProvider } from '../../../../../src/enigma/contexts/authentication/domain/interfaces/JWTProvider'
import { User } from '../../../../../src/enigma/contexts/authentication/domain/user'

export class JWTProviderMock implements JWTProvider {
    private signUserMock: Mock
    private token?: string

    constructor() {
        this.signUserMock = vi.fn()
    }

    signUser(user: User): string {
        this.signUserMock(user)

        if (!this.token) return 'token'

        return this.token
    }

    returnOnSignUser(token: string): void {
        this.token = token
    }
}
