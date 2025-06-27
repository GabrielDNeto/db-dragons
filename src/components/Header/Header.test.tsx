import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";

import Header from "./";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    handleLogout: vi.fn(),
  }),
}));

vi.mock("../Dropdown", () => ({
  __esModule: true,
  default: ({ children, options }: any) => (
    <div>
      <button>{children}</button>
      {options.map((opt: any) => (
        <button key={opt.label} onClick={opt.onClick}>
          {opt.label}
        </button>
      ))}
    </div>
  ),
}));

describe("<Header />", () => {
  test("renders logo and user icon", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByAltText("Dragon Icon")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});
