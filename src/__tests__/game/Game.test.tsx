import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../../game/Game";
import { useAppContext } from "../../hooks/useAppContext";
import { GameEngine } from "../../game/engine/GameEngine";

jest.mock("../../hooks/useAppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../game/engine/GameEngine", () => {
  return {
    GameEngine: jest.fn().mockImplementation(() => ({
      start: jest.fn().mockResolvedValue(undefined),
      stop: jest.fn(),
      cleanup: jest.fn(),
      isSoundOn: false,
    })),
  };
});

describe("Game component", () => {
  const mockOnToGameOver = jest.fn();
  const mockOnBackToMenu = jest.fn();
  const mockSetScore = jest.fn();
  const mockSetTimer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      score: 0,
      setScore: mockSetScore,
      timer: 30,
      setTimer: mockSetTimer,
      isSoundOn: true,
    });
  });

  test("renders game canvas and score", () => {
    render(
      <Game onToGameOver={mockOnToGameOver} onBackToMenu={mockOnBackToMenu} />
    );

    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Time Left: 30")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to Menu" })
    ).toBeInTheDocument();
    expect(screen.getByRole("canvas")).toBeInTheDocument();
  });

  test('calls onBackToMenu when "Back to Menu" button is clicked', () => {
    render(
      <Game onToGameOver={mockOnToGameOver} onBackToMenu={mockOnBackToMenu} />
    );

    const backToMenuButton = screen.getByText("Back to Menu");
    fireEvent.click(backToMenuButton);

    expect(mockOnBackToMenu).toHaveBeenCalled();
  });

  test("initializes GameEngine with correct parameters", () => {
    render(
      <Game onToGameOver={mockOnToGameOver} onBackToMenu={mockOnBackToMenu} />
    );

    expect(GameEngine).toHaveBeenCalledWith(
      "game-canvas",
      expect.any(Function),
      expect.any(Function),
      expect.any(Number),
      expect.any(Number)
    );
  });

  test("calls onToGameOver when timer reaches 1", () => {
    jest.useFakeTimers();
    (useAppContext as jest.Mock).mockReturnValue({
      score: 0,
      setScore: mockSetScore,
      timer: 1,
      setTimer: mockSetTimer,
      isSoundOn: true,
    });

    render(
      <Game onToGameOver={mockOnToGameOver} onBackToMenu={mockOnBackToMenu} />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockOnToGameOver).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
