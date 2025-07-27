import { NonceGenerator } from '../domain/interfaces/nonceGenerator'
import { UserRepository } from '../domain/repositories/userRepository'
import { User } from '../domain/user'

type CreateUserParams = {
    id: string
    nickName: string
    publicKey: string
}

export class CreateUser {
    constructor(private userRepository: UserRepository, private nonceGenerator: NonceGenerator) {}

    async execute({ id, nickName, publicKey }: CreateUserParams): Promise<void> {
        const nonce = this.nonceGenerator.generate()
        const user = User.create(id, nickName, publicKey, nonce)
        await this.userRepository.save(user)
    }
}
