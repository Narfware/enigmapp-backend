import { Nonce } from '../../../../../src/enigma/contexts/authentication/domain/value-objects/nonce'
import { Time } from '../../../../../src/enigma/contexts/authentication/domain/value-objects/time'

export class NonceMother {
    public static create(value?: string, expirationTime?: Time): Nonce {
        let _value = 'random_string'
        let _expirationTime = Time.now()

        if (value) _value = value
        if (expirationTime) _expirationTime = expirationTime

        return new Nonce(_value, _expirationTime)
    }

    public static expired(): Nonce {
        const expirationTime = Time.now().subtractMinutes(30)
        return NonceMother.create(undefined, expirationTime)
    }
}
