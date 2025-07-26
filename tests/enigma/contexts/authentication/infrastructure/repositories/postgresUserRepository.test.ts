import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { UserMother } from '../../domain/UserMother'
import { DrizzlePostgresUserRepository } from '../../../../../../src/enigma/contexts/authentication/infrastructure/repositories/postgresUserRepository'
import { DrizzleManager } from '../../../../../../src/enigma/shared/infrastructure/persistence/postgres/drizzle/connection'
import { DrizzlePostgresArranger } from '../../../../shared/infrastructure/persistence/drizzlePostgresArranger'
import { usersTable } from '../../../../../../src/enigma/contexts/authentication/infrastructure/persistence/postgres/drizzle/schemas/userSchema'
import { User } from '../../../../../../src/enigma/contexts/authentication/domain/user'
import { Nonce } from '../../../../../../src/enigma/contexts/authentication/domain/value-objects/nonce'
import { Time } from '../../../../../../src/enigma/contexts/authentication/domain/value-objects/time'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { NonceMother } from '../../domain/NonceMother'

let postgresUserRepository: DrizzlePostgresUserRepository
const arranger = new DrizzlePostgresArranger()
let database: NodePgDatabase

beforeAll(async () => {
    await arranger.initializeDatabase()
})

beforeEach(async () => {
    await arranger.cleanDatabase()

    database = DrizzleManager.getDatabase()
    postgresUserRepository = new DrizzlePostgresUserRepository(database)
})

afterAll(async () => {
    await arranger.close()
})

describe('PostgreSQL user repository', () => {
    it('Should save the user', async () => {
        const now = Time.now()
        const nonce = NonceMother.create('random_string', now)
        const user = UserMother.create(nonce)

        await postgresUserRepository.save(user)

        const results = await database.select().from(usersTable).where(eq(usersTable.id, 'uuid'))
        const userSaved = results[0]

        expect(userSaved).toMatchObject({
            id: 'uuid',
            nickName: 'John Doe',
            publicKey: 'public_key',
            nonce: 'random_string',
            nonceExpirationTime: now.toPrimitives()
        })
    })

    it('Should find user by id', async () => {
        await database.insert(usersTable).values({
            id: 'id',
            nickName: 'John Doe',
            publicKey: 'publicKey',
            nonce: 'randomStringInBase64==',
            nonceExpirationTime: 12378941923847
        })

        const user = await postgresUserRepository.find('id')

        const expectedUser = new User(
            'id',
            'John Doe',
            'publicKey',
            new Nonce('randomStringInBase64==', Time.fromPrimitives(12378941923847))
        )
        expect(user).toMatchObject(expectedUser)
    })
})
