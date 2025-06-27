import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Button from ".";

describe("Button Component", () => {
  test("Button should render with children", () => {
    render(<Button>Children</Button>);
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  test("sould call onClick function", () => {
    const click = vi.fn();
    render(<Button onClick={click}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(click).toHaveBeenCalledTimes(1);
  });

  test("should not call onClick function if button disabled", () => {
    const click = vi.fn();
    render(
      <Button onClick={click} disabled>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByText("Disabled"));
    expect(click).not.toHaveBeenCalled();
  });

  test("should add and merge classes", () => {
    render(<Button className="custom-class">Class</Button>);
    const button = screen.getByText("Class");
    expect(button).toHaveClass("custom-class");
  });
});
