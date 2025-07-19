import { Time } from './time'

export class Nonce {
    constructor(private _value: string, private expirationTime: Time) {}
}
