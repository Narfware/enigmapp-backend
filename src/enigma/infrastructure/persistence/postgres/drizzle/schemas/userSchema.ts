import { pgTable, varchar, integer } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
    id: varchar().primaryKey(),
    nickName: varchar(),
    publicKey: varchar(),
    nonce: varchar(),
    nonceExpirationTime: integer()
})
