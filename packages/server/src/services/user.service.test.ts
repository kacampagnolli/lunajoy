import { mock } from "jest-mock-extended";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "./user.service";
import { User } from "@prisma/client";


const makeSut = () => {
  const repository = mock<UserRepository>();
  const userService = new UserService(repository);

  return {sut: userService, repository }
}

describe("UserRepository", () => {

    it("should create a user", async () => {
      // Given
      const { sut, repository } = makeSut();

      const data = {
        externalId: "some external id",
        name: "John Doe",
        email: "john.doe@google.com"
      }

      const fakeUser: User = { id: 1, ...data, createdAt: new Date()};

      repository.createUser.mockResolvedValue(fakeUser);

      // When
      const result = await sut.createUser(data);

      //Then
      expect(result).toEqual(fakeUser);
      expect(repository.createUser).toHaveBeenCalledWith(data);
    });

    it("should get user by id", async () => {
      // Given
      const { sut, repository } = makeSut();

      const fakeUser: User = {
        id: 1,
        externalId: "some external id",
        name: "John Doe",
        email: "john.doe@google.com",
        createdAt: new Date()
      };


      repository.getUserById.mockResolvedValue(fakeUser);

      // When
      const result = await sut.getUserById(fakeUser.id);

      // Then
      expect(result).toEqual(fakeUser);
      expect(repository.getUserById).toHaveBeenCalledWith(fakeUser.id);
    });

    it("should get user by externalId", async () => {
      // Given
      const { sut, repository } = makeSut();

      const fakeUser: User = {
        id: 1,
        externalId: "some external id",
        name: "John Doe",
        email: "john.doe@google.com",
        createdAt: new Date()
      };


      repository.getUserByExternalId.mockResolvedValue(fakeUser);

      // When
      const result = await sut.getUserByExternalId(fakeUser.externalId);

      // Then
      expect(result).toEqual(fakeUser);
      expect(repository.getUserByExternalId).toHaveBeenCalledWith(fakeUser.externalId);
    });
});
