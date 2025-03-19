import { Server } from "socket.io";
import { setSocketInstance, getSocketInstance } from "./socket";
describe("Socket instance", () => {
  it("should throw an error if socket instance is not initialized", () => {
    expect(() => getSocketInstance()).toThrow("Socket instance has not been initialized.");
  });

  it("should return the socket instance after it is set", () => {
    const fakeSocket = {} as Server;
    setSocketInstance(fakeSocket);

    expect(getSocketInstance()).toBe(fakeSocket);
  });
});
