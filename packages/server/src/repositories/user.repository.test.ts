import { UserRepository } from "./user.repository";
import { User } from "@prisma/client";
import { prismaMock } from '../tests/singleton'

const makeSut = (): {sut: UserRepository} => {
  const userRepository = new UserRepository(prismaMock);

  return {sut: userRepository}
}

describe("UserRepository", () => {

  it("should create a user", async () => {
    // Given
    const { sut } = makeSut();

    const data = {
      externalId: "some external id",
      name: "John Doe",
      email: "john.doe@google.com"
    }

    const fakeUser: User = { id: 1, ...data, createdAt: new Date()};

    prismaMock.user.create.mockResolvedValue(fakeUser);

    // When
    const result = await sut.createUser(data);

    //Then
    expect(result).toEqual(fakeUser);
    expect(prismaMock.user.create).toHaveBeenCalledWith({ data });
  });

  it("should get user by id", async () => {
    // Given
    const { sut } = makeSut();

    const fakeUser: User = {
      id: 1,
      externalId: "some external id",
      name: "John Doe",
      email: "john.doe@google.com",
      createdAt: new Date()
    };


    prismaMock.user.findUnique.mockResolvedValue(fakeUser);

    // When
    const result = await sut.getUserById(fakeUser.id);

    // Then
    expect(result).toEqual(fakeUser);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: fakeUser.id }
    });
  });

  it("should get user by externalId", async () => {
    // Given
    const { sut } = makeSut();

    const fakeUser: User = {
      id: 1,
      externalId: "some external id",
      name: "John Doe",
      email: "john.doe@google.com",
      createdAt: new Date()
    };


    prismaMock.user.findUnique.mockResolvedValue(fakeUser);

    // When
    const result = await sut.getUserByExternalId(fakeUser.externalId);

    // Then
    expect(result).toEqual(fakeUser);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { externalId: fakeUser.externalId }
    });
  });
});
