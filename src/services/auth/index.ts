export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ access_token: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (email === "admin@mail.com" && password === "admin@123") {
    return {
      access_token: "12345678910",
    };
  }

  throw new Error("Invalid email or password");
}
