import { User } from '../../../src/enigma/domain/user'
import { NonceMother } from './NonceMother'

export class UserMother {
    public static create(): User {
        return new User('uuid', 'John Doe', 'public_key', NonceMother.create())
    }

    public static nonceExpired(): User {
        return new User('uuid', 'John Doe', 'public_key', NonceMother.expired())
    }
}
