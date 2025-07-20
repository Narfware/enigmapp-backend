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
    it('Should return true when nonce is signed correctly with the correct public key', async () => {
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

    it('Should return false when signature is tampered', () => {
        const nonce = NonceMother.create()

        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        })

        const signature = sign('sha256', Buffer.from(nonce.value), { key: privateKey })
        const tamperedSignature = signature.toString('base64').replace(/A/g, 'B')

        const { isValidSignature } = nodeCryptoSignatureVerifier.checkIsValidSignatureForNonce(
            nonce,
            publicKey,
            tamperedSignature
        )

        expect(isValidSignature).toBe(false)
    })

    it('Should return false when using a different public key', () => {
        const nonce = NonceMother.create()

        const originalKeyPair = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        })
        const anotherKeyPair = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        })

        const signature = sign('sha256', Buffer.from(nonce.value), { key: originalKeyPair.privateKey })

        const { isValidSignature } = nodeCryptoSignatureVerifier.checkIsValidSignatureForNonce(
            nonce,
            anotherKeyPair.publicKey,
            signature.toString('base64')
        )

        expect(isValidSignature).toBe(false)
    })

    it('Should return false when nonce is different from the signed one', () => {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        })

        const originalNonce = NonceMother.create('original_nonce')
        const differentNonce = NonceMother.create('different_nonce')

        const signature = sign('sha256', Buffer.from(originalNonce.value), { key: privateKey })

        const { isValidSignature } = nodeCryptoSignatureVerifier.checkIsValidSignatureForNonce(
            differentNonce,
            publicKey,
            signature.toString('base64')
        )

        expect(isValidSignature).toBe(false)
    })
})
