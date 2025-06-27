import type { Dragon } from "@/@types/dragon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router";
import { vi } from "vitest";
import Row from "./index";

// Mocks
vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
const mockInvalidateQueries = vi.fn();

const dragon: Dragon = {
  id: "1",
  name: "Night Fury",
  type: "Gelo",
  imageUrl: "https://dragon.img",
  histories: ["Flew over Berk"],
  createdAt: new Date("2023-05-01").toString(), // cuidado com timezone
};

describe("<Row />", () => {
  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useQueryClient as any).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
    (useMutation as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
  });

  test("renders dragon info correctly", () => {
    render(<Row dragon={dragon} />);

    expect(screen.getByText(dragon.name)).toBeInTheDocument();
    expect(screen.getByText("Flew over Berk")).toBeInTheDocument();
    expect(screen.getByText("30/04/2023")).toBeInTheDocument(); // data corrigida
    expect(screen.getByRole("img")).toHaveAttribute("src", dragon.imageUrl);
  });

  test('navigates to edit page when "Edit" is clicked', () => {
    render(<Row dragon={dragon} />);

    fireEvent.click(screen.getByRole("button")); // abre dropdown
    const editOption = screen.getByText("Editar");
    fireEvent.click(editOption);

    expect(mockNavigate).toHaveBeenCalledWith(`/dragons/${dragon.id}`);
  });

  test('calls delete mutation when "Delete" is clicked', () => {
    const mockMutate = vi.fn();
    (useMutation as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<Row dragon={dragon} />);

    fireEvent.click(screen.getByRole("button")); // abre dropdown
    const deleteOption = screen.getByText("Excluir");
    fireEvent.click(deleteOption);

    expect(mockMutate).toHaveBeenCalledWith(dragon.id);
  });

  test("renders RowSkeleton if mutation is pending", () => {
    (useMutation as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<Row dragon={dragon} />);

    expect(screen.getByTestId("row-skeleton")).toBeInTheDocument();
  });
});
