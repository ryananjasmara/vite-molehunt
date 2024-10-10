import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoundToggle from "../../shared/component.ts/sound-toggle";
import { useAppContext } from "../../hooks/useAppContext";

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("SoundToggle component", () => {
  const mockSetIsSoundOn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sound on button when sound is on", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      isSoundOn: true,
      setIsSoundOn: mockSetIsSoundOn,
    });

    render(<SoundToggle />);

    const soundButton = screen.getByRole("button");
    expect(soundButton).toHaveTextContent("🔊");
  });

  test("renders sound off button when sound is off", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      isSoundOn: false,
      setIsSoundOn: mockSetIsSoundOn,
    });

    render(<SoundToggle />);

    const soundButton = screen.getByRole("button");
    expect(soundButton).toHaveTextContent("🔇");
  });

  test("toggles sound when button is clicked", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      isSoundOn: true,
      setIsSoundOn: mockSetIsSoundOn,
    });

    render(<SoundToggle />);

    const soundButton = screen.getByRole("button");
    fireEvent.click(soundButton);

    expect(mockSetIsSoundOn).toHaveBeenCalledWith(false);
  });
});
