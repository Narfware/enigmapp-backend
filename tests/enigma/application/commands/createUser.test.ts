import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { User } from '../../../../src/enigma/domain/user'
import { CreateUser } from '../../../../src/enigma/application/commands/createUser'
import { UserRepositoryMock } from '../../__mocks__/userRepositoryMock';

let userRepository: UserRepositoryMock;

beforeEach(() => {
    userRepository = new UserRepositoryMock();
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe("Create enigma user", () => {
    it("Should create an enigma user", async () => {
        const expected_user = new User("uuid", "John Doe", "publicKey")

        const useCase = new CreateUser()
        await useCase.execute({ uuid: "uuid", nickName: "John Doe", publicKey: "publicKey" })

        const spySave = vi.spyOn(userRepository, "save")
        expect(spySave).toBeCalledWith(expected_user)
    })

})