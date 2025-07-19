import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { TimeProviderMock } from '../__mocks__/timeProviderMock'
import { NodeCryptoNonceGenerator } from '../../../src/enigma/infrastructure/nodeCryptoNonceGenerator'
import { Time } from '../../../src/enigma/domain/value-objects/time'

let timeProvider: TimeProviderMock
let nodeCyptoNonceGenerator: NodeCryptoNonceGenerator

beforeEach(() => {
    timeProvider = new TimeProviderMock()
    nodeCyptoNonceGenerator = new NodeCryptoNonceGenerator(timeProvider)
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Create a nonce', () => {
    it('Should create a nonce with expiration time in two minutes', async () => {
        const date = new Date(1995, 3, 27, 18, 30)
        timeProvider.returnOnNow(Time.fromPrimitives(date.getTime()))

        const nonce = nodeCyptoNonceGenerator.generate()

        expect(nonce.toPrimitives().expirationTime).toBe(799000320000)
    })
})
