import { User } from '../user'

export interface UserRepository {
    save(user: User): Promise<void>
    find(uuid: string): Promise<User>
}
