import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/enigma/contexts/authentication/infrastructure/persistence/postgres/drizzle/schemas'
})
