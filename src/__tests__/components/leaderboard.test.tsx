import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Leaderboard from "../../shared/component.ts/leaderboard";
import * as storage from "../../shared/utils/storage";

jest.mock("../../shared/utils/storage", () => ({
  getLocalStorageItem: jest.fn(),
}));

describe("Leaderboard component", () => {
  const mockOnBackToMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders leaderboard with data", () => {
    const mockData = [
      { name: "Player 1", score: 100, rank: 1 },
      { name: "Player 2", score: 90, rank: 2 },
      { name: "Player 3", score: 80, rank: 3 },
    ];
    (storage.getLocalStorageItem as jest.Mock).mockReturnValue(mockData);

    render(<Leaderboard onBackToMenu={mockOnBackToMenu} />);

    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("Player 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Player 2")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("Player 3")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  test('renders "No data" message when leaderboard is empty', () => {
    (storage.getLocalStorageItem as jest.Mock).mockReturnValue([]);

    render(<Leaderboard onBackToMenu={mockOnBackToMenu} />);

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  test('calls onBackToMenu when "Back to Menu" button is clicked', () => {
    (storage.getLocalStorageItem as jest.Mock).mockReturnValue([]);

    render(<Leaderboard onBackToMenu={mockOnBackToMenu} />);

    const backToMenuButton = screen.getByText("Back to Menu");
    fireEvent.click(backToMenuButton);

    expect(mockOnBackToMenu).toHaveBeenCalled();
  });
});
