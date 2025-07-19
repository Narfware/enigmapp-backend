import { TimeProvider } from '../interfaces/timeProvider'
import { Time } from './time'

const NONCE_EXPIRATION_TIME_IN_MINUTES = 2

export class Nonce {
    constructor(private _value: string, private expirationTime: Time) {}

    public equals(nonce: Nonce) {
        return this.toPrimitives() === nonce.toPrimitives()
    }

    public static create(value: string, timeProvider: TimeProvider): Nonce {
        const expirationTime = timeProvider.now().addMinutes(NONCE_EXPIRATION_TIME_IN_MINUTES)
        return new Nonce(value, expirationTime)
    }

    public toPrimitives(): { value: string; expirationTime: number } {
        return { value: this._value, expirationTime: this.expirationTime.toPrimitives() }
    }
}
