import { describe, expect } from "vitest";
import { signin } from "./";

describe("signin function", () => {
  test("should return access_token for valid credentials", async () => {
    const result = await signin({
      email: "admin@mail.com",
      password: "admin@123",
    });
    expect(result).toHaveProperty("access_token", "12345678910");
  });

  test("should throw error for invalid email", async () => {
    await expect(
      signin({
        email: "wrong@mail.com",
        password: "admin@123",
      }),
    ).rejects.toThrow("Invalid email or password");
  });

  test("should throw error for invalid password", async () => {
    await expect(
      signin({
        email: "admin@mail.com",
        password: "wrongpassword",
      }),
    ).rejects.toThrow("Invalid email or password");
  });

  test("should throw error for invalid email and password", async () => {
    await expect(
      signin({
        email: "wrong@mail.com",
        password: "wrongpassword",
      }),
    ).rejects.toThrow("Invalid email or password");
  });
});
