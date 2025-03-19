import { UserService } from "../services/user.service";
import { createUserModule } from "./user.factory";

describe("createUserModule", () => {
  it("should return an object with userService being an instance of UserService", () => {
    const { userService } = createUserModule();
    expect(userService).toBeInstanceOf(UserService);
  });
});
