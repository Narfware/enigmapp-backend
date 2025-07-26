import { User } from '../../../../../src/enigma/contexts/authentication/domain/user'
import { Nonce } from '../../../../../src/enigma/contexts/authentication/domain/value-objects/nonce'
import { NonceMother } from './NonceMother'

export class UserMother {
    public static create(nonce?: Nonce): User {
        let _nonce = NonceMother.create()
        if (nonce) _nonce = nonce

        return new User('uuid', 'John Doe', 'public_key', _nonce)
    }

    public static nonceExpired(): User {
        return new User('uuid', 'John Doe', 'public_key', NonceMother.expired())
    }
}
