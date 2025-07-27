import { eq } from 'drizzle-orm'
import { UserRepository } from '../../domain/repositories/userRepository'
import { User } from '../../domain/user'
import { usersTable } from '../persistence/postgres/drizzle/schemas/userSchema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

export class DrizzlePostgresUserRepository implements UserRepository {
    private database: NodePgDatabase

    constructor(database: NodePgDatabase) {
        this.database = database
    }

    async save(user: User): Promise<void> {
        const primitiveUser = user.toPrimitives()

        await this.database
            .insert(usersTable)
            .values({
                id: primitiveUser.id,
                nickName: primitiveUser.nickName,
                publicKey: primitiveUser.publicKey,
                nonce: primitiveUser.nonce.value,
                nonceExpirationTime: primitiveUser.nonce.expirationTime
            })
            .onConflictDoUpdate({
                target: usersTable.id,
                set: {
                    nickName: primitiveUser.nickName,
                    publicKey: primitiveUser.publicKey,
                    nonce: primitiveUser.nonce.value,
                    nonceExpirationTime: primitiveUser.nonce.expirationTime
                }
            })
    }

    async find(id: string): Promise<User> {
        const results = await this.database.select().from(usersTable).where(eq(usersTable.id, id))
        const user = results[0]

        return User.fromPrimitives({
            id: user.id,
            nickName: user.nickName,
            publicKey: user.publicKey,
            nonce: { value: user.nonce, expirationTime: user.nonceExpirationTime }
        })
    }
}
