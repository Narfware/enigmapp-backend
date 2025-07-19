import { UserRepository } from '../../domain/repositories/userRepository'
import { User } from '../../domain/user'

type Params = {
    id: string
    nickName: string
    publicKey: string
}

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute({ id, nickName, publicKey }: Params): Promise<void> {
        const user = User.create(id, nickName, publicKey)
        await this.userRepository.save(user)
    }
}
