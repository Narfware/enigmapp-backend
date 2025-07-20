import { NonceGenerator } from './interfaces/nonceGenerator'
import { SignatureVerifier } from './interfaces/signatureVerifier'
import { Nonce } from './value-objects/nonce'

export class User {
    private readonly id: string
    private nickName: string
    private publicKey: string
    private nonce?: Nonce

    constructor(id: string, nickName: string, publicKey: string, nonce?: Nonce) {
        this.id = id
        this.nickName = nickName
        this.publicKey = publicKey
        this.nonce = nonce
    }

    public static create(id: string, nickName: string, publicKey: string): User {
        return new User(id, nickName, publicKey)
    }

    public generateNonce(nonceGenerator: NonceGenerator): Nonce {
        const nonce = nonceGenerator.generate()
        this.nonce = nonce

        return nonce
    }

    public verifyNonce(signatureVerifier: SignatureVerifier, nonceValue: string, signature: string): void {
        if (!this.nonce) return

        signatureVerifier.verifyNonce(this.nonce, this.publicKey, signature)
    }
}
