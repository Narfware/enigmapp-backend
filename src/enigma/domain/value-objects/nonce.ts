import { Time } from './time'

export class Nonce {
    constructor(private _value: string, private expirationTime: Time) {}

    public equals(nonce: Nonce) {
        return this.toPrimitives() === nonce.toPrimitives()
    }

    public toPrimitives(): { value: string; expirationTime: number } {
        return { value: this._value, expirationTime: this.expirationTime.toPrimitives() }
    }
}
