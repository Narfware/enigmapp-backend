import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
    id: varchar().primaryKey(),
    nickName: varchar().notNull(),
    publicKey: varchar().notNull(),
    nonce: varchar().notNull(),
    nonceExpirationTime: bigint({ mode: 'number' }).notNull()
})
