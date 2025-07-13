export class User {
    private _uuid: string
    private _nickName: string
    private _publicKey: string

    constructor(uuid: string, nickName: string, publicKey: string) {
        this._uuid = uuid
        this._nickName = nickName
        this._publicKey = publicKey
    }
}