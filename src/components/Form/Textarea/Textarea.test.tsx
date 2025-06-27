import { fireEvent, render, screen } from "@testing-library/react";
import Textarea from "./";

describe("<Textarea />", () => {
  test("renders textarea with passed props", () => {
    render(<Textarea placeholder="Digite sua mensagem" />);

    const textarea = screen.getByPlaceholderText("Digite sua mensagem");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  test("applies className and styles correctly", () => {
    render(<Textarea className="custom-class" placeholder="Texto" />);

    const textarea = screen.getByPlaceholderText("Texto");
    expect(textarea).toHaveClass("custom-class");
    expect(textarea.className).toMatch(/textarea/); // do módulo SCSS
  });

  test("updates value on user input", () => {
    render(<Textarea placeholder="Mensagem" />);

    const textarea = screen.getByPlaceholderText(
      "Mensagem",
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Olá mundo" } });

    expect(textarea.value).toBe("Olá mundo");
  });
});
