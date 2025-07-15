import { UserRepository } from '../../domain/repositories/userRepository'
import { User } from '../../domain/user'

type Params = {
    uuid: string
    nickName: string
    publicKey: string
}

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute({ uuid, nickName, publicKey }: Params): Promise<void> {
        const user = User.create(uuid, nickName, publicKey)
        await this.userRepository.save(user)
    }
}
