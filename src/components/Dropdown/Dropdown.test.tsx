import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./";
import { vi } from "vitest";

describe("<Dropdown />", () => {
  const mockOptionClick = vi.fn();
  const options = [
    { label: "Edit", onClick: mockOptionClick },
    { label: "Delete", onClick: mockOptionClick },
  ];

  beforeEach(() => {
    mockOptionClick.mockClear();
  });

  test("renders the trigger button (children)", () => {
    render(
      <Dropdown options={options}>
        <span>Toggle</span>
      </Dropdown>,
    );

    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  test("shows options when clicked", () => {
    render(
      <Dropdown options={options}>
        <span>Toggle</span>
      </Dropdown>,
    );

    fireEvent.click(screen.getByText("Toggle"));

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls option onClick when clicked", () => {
    render(
      <Dropdown options={options}>
        <span>Toggle</span>
      </Dropdown>,
    );

    fireEvent.click(screen.getByText("Toggle"));
    fireEvent.click(screen.getByText("Edit"));

    expect(mockOptionClick).toHaveBeenCalled();
  });

  test("closes dropdown when clicking outside", () => {
    render(
      <div>
        <Dropdown options={options}>
          <span>Toggle</span>
        </Dropdown>
        <button>Outside</button>
      </div>,
    );

    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByText("Edit")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText("Outside"));

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });
});
