import { render, screen } from "@testing-library/react";
import DefaultTemplate from "./";
import { vi } from "vitest";

vi.mock("@/components/Header", () => ({
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

vi.mock("react-router", () => ({
  Outlet: () => <div data-testid="mock-outlet">Outlet Mock</div>,
}));

import styles from "./DefaultTemplate.module.scss";

describe("<DefaultTemplate />", () => {
  test("should render Header and Outlet inside the layout with correct classes", () => {
    render(<DefaultTemplate />);

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();

    // Busca pelo container com a classe template
    const templateDiv = document.querySelector(`.${styles.template}`);
    expect(templateDiv).toBeInTheDocument();

    // Busca pela section com a classe section
    const section = document.querySelector(`.${styles.section}`);
    expect(section).toBeInTheDocument();

    // Busca pelo main com a classe container
    const main = document.querySelector(".container");
    expect(main).toBeInTheDocument();
  });
});
