import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Server } from '../../../../../../src/enigma/shared/infrastructure/server'
import { Server as HttpServer } from 'node:http'

let httpServer: HttpServer

beforeAll(async () => {
    const server = new Server('8080')
    await server.listenHttp()

    if (!server.httpServer) return

    httpServer = server.httpServer
})

describe('Create user controller', () => {
    it('Should return 200 when user is created successfully', async () => {
        const response = await request(httpServer)
            .post('/users')
            .send({ id: 'uuid', nickName: 'John Doe', publicKey: 'publicKey' })

        expect(response.statusCode).toBe(200)
    })
})
