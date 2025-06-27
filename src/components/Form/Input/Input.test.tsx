import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./";

describe("<Input />", () => {
  test("renders a text input by default", () => {
    render(<Input placeholder="Enter name" />);

    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("text");
  });

  test("renders a search input with search icon", () => {
    render(<Input variant="search" placeholder="Search..." />);

    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("search");

    const icon = screen.getByTestId("search-icon");
    expect(icon).toBeInTheDocument();
  });

  test("renders a password input with toggle button", () => {
    render(<Input variant="password" placeholder="Password" />);

    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("password");

    const toggleBtn = screen.getByRole("button");
    expect(toggleBtn).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    render(<Input variant="password" placeholder="Password" />);

    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const toggleBtn = screen.getByRole("button");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("password");
  });

  test("applies error class when hasError is true", () => {
    const { container } = render(
      <Input variant="text" placeholder="Error input" hasError />,
    );

    const input = screen.getByPlaceholderText("Error input");
    expect(input).toBeInTheDocument();
    expect(container.querySelector("input")?.className).toMatch(/error/);
  });
});
