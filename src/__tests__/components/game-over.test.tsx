import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameOver from "../../shared/component.ts/game-over";
import { useAppContext } from "../../hooks/useAppContext";
import * as storage from "../../shared/utils/storage";

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../shared/utils/storage", () => ({
  getLocalStorageItem: jest.fn(),
  setLocalStorageItem: jest.fn(),
}));

describe("GameOver component", () => {
  const mockOnBackToMenu = jest.fn();
  const mockScore = 100;

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({ score: mockScore });
    (storage.getLocalStorageItem as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders game over screen with correct score", () => {
    render(<GameOver onBackToMenu={mockOnBackToMenu} />);

    expect(screen.getByText("Game Over")).toBeInTheDocument();
    expect(
      screen.getByText(`Your final score: ${mockScore}`)
    ).toBeInTheDocument();
  });

  test("updates player name input", () => {
    render(<GameOver onBackToMenu={mockOnBackToMenu} />);

    const input = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(input, { target: { value: "Test Player" } });

    expect(input).toHaveValue("Test Player");
  });

  test("submits score and calls onBackToMenu", () => {
    render(<GameOver onBackToMenu={mockOnBackToMenu} />);

    const input = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(input, { target: { value: "Test Player" } });

    const submitButton = screen.getByText("Submit Score");
    fireEvent.click(submitButton);

    expect(storage.setLocalStorageItem).toHaveBeenCalledWith("leaderboards", [
      { name: "Test Player", score: mockScore, rank: 1 },
    ]);
    expect(mockOnBackToMenu).toHaveBeenCalled();
  });

  test('submits score with "No Name" if player name is empty', () => {
    render(<GameOver onBackToMenu={mockOnBackToMenu} />);

    const submitButton = screen.getByText("Submit Score");
    fireEvent.click(submitButton);

    expect(storage.setLocalStorageItem).toHaveBeenCalledWith("leaderboards", [
      { name: "No Name", score: mockScore, rank: 1 },
    ]);
    expect(mockOnBackToMenu).toHaveBeenCalled();
  });

  test('calls onBackToMenu when "Back to Menu" button is clicked', () => {
    render(<GameOver onBackToMenu={mockOnBackToMenu} />);

    const backToMenuButton = screen.getByText("Back to Menu");
    fireEvent.click(backToMenuButton);

    expect(mockOnBackToMenu).toHaveBeenCalled();
  });
});
