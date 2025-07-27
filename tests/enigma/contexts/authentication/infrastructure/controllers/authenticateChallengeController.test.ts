import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Server } from '../../../../../../src/enigma/shared/infrastructure/server'
import { Server as HttpServer } from 'node:http'
import { beforeEach } from 'node:test'
import { DrizzlePostgresArranger } from '../../../../shared/infrastructure/persistence/drizzlePostgresArranger'
import { initAuthenticationContainer } from '../../../../../../src/enigma/contexts/authentication/infrastructure/dependency-injection'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { usersTable } from '../../../../../../src/enigma/contexts/authentication/infrastructure/persistence/postgres/drizzle/schemas/userSchema'
import { generateKeyPairSync, sign } from 'node:crypto'
import { NonceMother } from '../../domain/NonceMother'
import { Time } from '../../../../../../src/enigma/contexts/authentication/domain/value-objects/time'
import jwt from 'jsonwebtoken'

let httpServer: HttpServer
const arranger = new DrizzlePostgresArranger()
let database: NodePgDatabase

beforeAll(async () => {
    process.env.JWT_PRIVATE_KEY = 'privateKey'

    database = await arranger.initializeDatabase()
    initAuthenticationContainer(database)

    const server = new Server('8080')
    await server.listenHttp()

    if (!server.httpServer) return

    httpServer = server.httpServer
})

beforeEach(async () => {
    await arranger.cleanDatabase()
})

afterAll(async () => {
    await arranger.close()
})

describe('Authenticate challenge controller', () => {
    it('Should return 200 with JWT', async () => {
        const userId = 'ba765868-4fd3-4d14-b982-2eba9fe9d893'

        const expirationTime = Time.now().addMinutes(2)
        const nonce = NonceMother.create('randomStringInBase64==', expirationTime)

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
        }).toString('base64')

        await database.insert(usersTable).values({
            id: userId,
            nickName: 'John Doe',
            publicKey: publicKey,
            nonce: nonce.value,
            nonceExpirationTime: nonce.expirationTime.toPrimitives()
        })

        const {
            statusCode,
            body: { token }
        } = await request(httpServer)
            .post(`/users/${userId}/auth/challenge`)
            .send({ nonce: nonce.value, signature: signature })

        const decodedToken = jwt.decode(token, { json: true })

        expect(statusCode).toBe(200)
        expect(decodedToken?.sub).toBe(userId)
    })
})
