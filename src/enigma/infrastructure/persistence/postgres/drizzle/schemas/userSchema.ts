import { InferSelectModel } from 'drizzle-orm'
import { pgTable, varchar, integer } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
    id: varchar().primaryKey(),
    nickName: varchar().notNull(),
    publicKey: varchar().notNull(),
    nonce: varchar().notNull(),
    nonceExpirationTime: integer().notNull()
})
export type DrizzleUser = InferSelectModel<typeof usersTable>
