/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRepository } from '../../../src/enigma/domain/repositories/userRepository'
import { User } from '../../../src/enigma/domain/user'

export class UserRepositoryMock implements UserRepository {
    async save(user: User): Promise<void> {}
}
