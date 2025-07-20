import { UserRepository } from '../../../src/enigma/domain/repositories/userRepository'
import { User } from '../../../src/enigma/domain/user'
import { Mock, vi, expect } from 'vitest'
import { UserMother } from '../domain/UserMother'

export class UserRepositoryMock implements UserRepository {
    private saveMock: Mock
    private findUser: Mock
    private user?: User

    constructor() {
        this.saveMock = vi.fn()
        this.findUser = vi.fn()
    }

    async save(user: User): Promise<void> {
        this.saveMock(user)
    }

    async find(id: string): Promise<User> {
        this.findUser(id)

        if (!this.user) return UserMother.create()

        return this.user
    }

    returnOnFind(user: User) {
        this.user = user
    }

    assertSaveHaveBeenCalledWith(expected: User): void {
        expect(this.saveMock).toHaveBeenCalledWith(expected)
    }

    assertSaveNotCalled(): void {
        expect(this.saveMock).toHaveBeenCalledTimes(0)
    }
}
