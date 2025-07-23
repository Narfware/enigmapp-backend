import { TimeProvider } from '../interfaces/timeProvider'
import { Time } from './time'

const NONCE_EXPIRATION_TIME_IN_MINUTES = 2

export class Nonce {
    constructor(readonly value: string, readonly expirationTime: Time) {}

    public equals(nonce: Nonce) {
        return this.toPrimitives() === nonce.toPrimitives()
    }

    public hasSameValue(value: string): boolean {
        return this.value == value
    }

    public isExpired(now: Time): boolean {
        return this.expirationTime.isBefore(now)
    }

    public static create(value: string, timeProvider: TimeProvider): Nonce {
        const expirationTime = timeProvider.now().addMinutes(NONCE_EXPIRATION_TIME_IN_MINUTES)
        return new Nonce(value, expirationTime)
    }

    public toPrimitives(): { value: string; expirationTime: number } {
        return { value: this.value, expirationTime: this.expirationTime.toPrimitives() }
    }

    public static fromPrimitives({ value, expirationTime }: { value: string; expirationTime: number }) {
        return new Nonce(value, Time.fromPrimitives(expirationTime))
    }
}
