import { APP_ROUTES } from "@/config/router/routes";
import { useAuth } from "@/hooks/useAuth";
import { render, screen } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router";
import RouterGuard from "./";

import { vi } from "vitest";

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
  Outlet: () => <div>Outlet Mock</div>,
}));

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("RouterGuard", () => {
  const mockedUseAuth = useAuth as unknown as ReturnType<typeof vi.fn>;
  const mockedUseNavigate = useNavigate as unknown as ReturnType<typeof vi.fn>;
  const mockedUseLocation = useLocation as unknown as ReturnType<typeof vi.fn>;

  let mockNavigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockNavigate = vi.fn();
    mockedUseNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders Outlet", () => {
    mockedUseAuth.mockReturnValue({ authStatus: "authorized" });
    mockedUseLocation.mockReturnValue({ pathname: "/any-path" });

    render(<RouterGuard />);
    expect(screen.getByText("Outlet Mock")).toBeInTheDocument();
  });

  test("redirects to signin if unauthorized", () => {
    mockedUseAuth.mockReturnValue({ authStatus: "unauthorized" });
    mockedUseLocation.mockReturnValue({ pathname: "/some-path" });

    render(<RouterGuard />);
    expect(mockNavigate).toHaveBeenCalledWith(APP_ROUTES.public.signin);
  });

  test("redirects to private dragons if authorized and on signin page", () => {
    mockedUseAuth.mockReturnValue({ authStatus: "authorized" });
    mockedUseLocation.mockReturnValue({ pathname: APP_ROUTES.public.signin });

    render(<RouterGuard />);
    expect(mockNavigate).toHaveBeenCalledWith(APP_ROUTES.private.dragons);
  });

  test("does not redirect if authorized and not on signin page", () => {
    mockedUseAuth.mockReturnValue({ authStatus: "authorized" });
    mockedUseLocation.mockReturnValue({ pathname: "/private/other" });

    render(<RouterGuard />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
