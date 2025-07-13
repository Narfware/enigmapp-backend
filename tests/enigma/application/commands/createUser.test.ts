import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { User } from '../../../../src/enigma/domain/user'
import { CreateUser } from '../../../../src/enigma/application/commands/createUser'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock';

let userRepository: UserRepositoryMock;
let useCase: CreateUser

beforeEach(() => {
    userRepository = new UserRepositoryMock();
    useCase = new CreateUser(userRepository)
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe("Create enigma user", () => {
    it("Should create an enigma user", async () => {
        const expected_user = new User("uuid", "John Doe", "publicKey")
        const spySave = vi.spyOn(userRepository, "save")

        await useCase.execute({ uuid: "uuid", nickName: "John Doe", publicKey: "publicKey" })

        expect(spySave).toHaveBeenCalledExactlyOnceWith(expected_user)
    })

})