import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Server } from '../../../../../../src/enigma/shared/infrastructure/server'
import { Server as HttpServer } from 'node:http'
import { beforeEach } from 'node:test'
import { DrizzlePostgresArranger } from '../../../../shared/infrastructure/persistence/drizzlePostgresArranger'
import { initAuthenticationContainer } from '../../../../../../src/enigma/contexts/authentication/infrastructure/dependency-injection'

let httpServer: HttpServer
const arranger = new DrizzlePostgresArranger()

beforeAll(async () => {
    const database = await arranger.initializeDatabase()
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

describe('Create user controller', () => {
    it('Should return 200 when user is created successfully', async () => {
        const response = await request(httpServer)
            .post('/users/')
            .send({ id: 'uuid', nickName: 'John Doe', publicKey: 'publicKey' })

        expect(response.statusCode).toBe(200)
    })
})
