import { User } from '../user'

export interface UserRepository {
    save(user: User): Promise<void>
    find(id: string): Promise<User>
}
