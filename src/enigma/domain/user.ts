export class User {
    private _uuid: string
    private _nickName: string
    private _publicKey: string
    private _nonce?: string

    constructor(uuid: string, nickName: string, publicKey: string, nonce?: string) {
        this._uuid = uuid
        this._nickName = nickName
        this._publicKey = publicKey
        this._nonce = nonce
    }

    public static create(uuid: string, nickName: string, publicKey: string): User {
        return new User(uuid, nickName, publicKey)
    }
}
