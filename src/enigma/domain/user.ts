import { NonceGenerator } from './interfaces/nonceGenerator'
import { Nonce } from './value-objects/nonce'

export class User {
    private readonly _id: string
    private _nickName: string
    private _publicKey: string
    private _nonce?: Nonce

    constructor(id: string, nickName: string, publicKey: string, nonce?: Nonce) {
        this._id = id
        this._nickName = nickName
        this._publicKey = publicKey
        this._nonce = nonce
    }

    public static create(id: string, nickName: string, publicKey: string): User {
        return new User(id, nickName, publicKey)
    }

    public generateNonce(nonceGenerator: NonceGenerator): Nonce {
        const nonce = nonceGenerator.generate()
        this._nonce = nonce

        return nonce
    }
}
