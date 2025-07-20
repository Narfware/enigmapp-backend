import { InvalidNonce } from './exceptions/invalidNonce'
import { NonceGenerator } from './interfaces/nonceGenerator'
import { SignatureVerifier } from './interfaces/signatureVerifier'
import { Nonce } from './value-objects/nonce'

export class User {
    private readonly id: string
    private nickName: string
    private publicKey: string
    private nonce: Nonce

    constructor(id: string, nickName: string, publicKey: string, nonce: Nonce) {
        this.id = id
        this.nickName = nickName
        this.publicKey = publicKey
        this.nonce = nonce
    }

    public static create(id: string, nickName: string, publicKey: string, nonce: Nonce): User {
        return new User(id, nickName, publicKey, nonce)
    }

    public generateNonce(nonceGenerator: NonceGenerator): Nonce {
        const nonce = nonceGenerator.generate()
        this.nonce = nonce

        return nonce
    }

    public verifyNonce(
        signatureVerifier: SignatureVerifier,
        nonceGenerator: NonceGenerator,
        nonceValue: string,
        signature: string
    ): void {
        if (!this.nonce.hasSameValue(nonceValue)) throw new InvalidNonce()

        signatureVerifier.verifyNonce(this.nonce, this.publicKey, signature)
        this.nonce = nonceGenerator.generate()
    }
}
