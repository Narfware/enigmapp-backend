import { eq } from 'drizzle-orm'
import { UserRepository } from '../../../../src/enigma/domain/repositories/userRepository'
import { User } from '../../../../src/enigma/domain/user'
import { database } from '../../../../src/enigma/infrastructure/persistence/postgres/drizzle/connection'
import { usersTable } from '../../../../src/enigma/infrastructure/persistence/postgres/drizzle/schemas/userSchema'

export class PostgresUserRepository implements UserRepository {
    async save(user: User): Promise<void> {
        const primitiveUser = user.toPrimitives()

        await database.insert(usersTable).values({
            id: primitiveUser.id,
            nickName: primitiveUser.nickName,
            publicKey: primitiveUser.nickName,
            nonce: primitiveUser.nonce.value,
            nonceExpirationTime: primitiveUser.nonce.expirationTime
        })
    }

    async find(id: string): Promise<User> {
        const results = await database.select().from(usersTable).where(eq(usersTable.id, id))
        const user = results[0]

        return User.fromPrimitives({
            id: user.id,
            nickName: user.nickName,
            publicKey: user.publicKey,
            nonce: { value: user.nonce, expirationTime: user.nonceExpirationTime }
        })
    }
}
