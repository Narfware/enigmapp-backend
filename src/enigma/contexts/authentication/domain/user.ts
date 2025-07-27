import { InvalidNonce } from './exceptions/invalidNonce'
import { InvalidNonceSignature } from './exceptions/invalidNonceSignature'
import { NonceGenerator } from './interfaces/nonceGenerator'
import { SignatureVerifier } from './interfaces/signatureVerifier'
import { TimeProvider } from './interfaces/timeProvider'
import { Nonce } from './value-objects/nonce'

export type PrimitiveUser = {
    id: string
    nickName: string
    publicKey: string
    nonce: { value: string; expirationTime: number }
}

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
        timeProvider: TimeProvider,
        nonceValue: string,
        signature: string
    ): void {
        if (this.nonce.isExpired(timeProvider.now())) throw new InvalidNonce('Nonce expired')
        if (!this.nonce.hasSameValue(nonceValue)) throw new InvalidNonce('Nonce disabled')

        const { isValidSignature } = signatureVerifier.checkIsValidSignatureForNonce(
            this.nonce,
            this.publicKey,
            signature
        )
        if (!isValidSignature) throw new InvalidNonceSignature()

        this.nonce = nonceGenerator.generate()
    }

    public static fromPrimitives({ id, nickName, publicKey, nonce }: PrimitiveUser): User {
        return new User(id, nickName, publicKey, Nonce.fromPrimitives(nonce))
    }

    public toPrimitives(): PrimitiveUser {
        return { id: this.id, nickName: this.nickName, publicKey: this.publicKey, nonce: this.nonce.toPrimitives() }
    }
}
