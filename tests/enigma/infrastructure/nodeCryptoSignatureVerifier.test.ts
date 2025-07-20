import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { NodeCryptoSignatureVerifier } from '../../../src/enigma/infrastructure/nodeCryptoSignatureVerifier'
import { NonceMother } from '../domain/NonceMother'
import { sign, generateKeyPairSync } from 'crypto'

let nodeCryptoSignatureVerifier: NodeCryptoSignatureVerifier

beforeEach(() => {
    nodeCryptoSignatureVerifier = new NodeCryptoSignatureVerifier()
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Signature verifier', () => {
    it('Should return true when nonce is signed correctly with the user public key', async () => {
        const nonce = NonceMother.create()

        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        })
        const signature = sign('sha256', Buffer.from(nonce.value), {
            key: privateKey
        })

        const { isValidSignature } = nodeCryptoSignatureVerifier.checkIsValidSignatureForNonce(
            nonce,
            publicKey,
            signature.toString('base64')
        )

        expect(isValidSignature).toBe(true)
    })
})
