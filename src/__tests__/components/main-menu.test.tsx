import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainMenu from "../../shared/component.ts/main-menu";

jest.mock("../../shared/component.ts/main-menu.module.css", () => ({
  main: "main-class",
  button: "button-class",
}));

describe("MainMenu", () => {
  const mockOnStartGame = jest.fn();
  const mockOnShowLeaderboard = jest.fn();

  beforeEach(() => {
    render(
      <MainMenu
        onStartGame={mockOnStartGame}
        onShowLeaderboard={mockOnShowLeaderboard}
      />
    );
  });

  it("renders the title correctly", () => {
    const titleElement = screen.getByText("Mole Hunter");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
  });

  it("renders the Start Game button", () => {
    const startGameButton = screen.getByText("Start Game");
    expect(startGameButton).toBeInTheDocument();
    expect(startGameButton).toHaveClass("button-class");
  });

  it("renders the Leaderboard button", () => {
    const leaderboardButton = screen.getByText("Leaderboard");
    expect(leaderboardButton).toBeInTheDocument();
    expect(leaderboardButton).toHaveClass("button-class");
  });

  it("calls onStartGame when Start Game button is clicked", () => {
    const startGameButton = screen.getByText("Start Game");
    fireEvent.click(startGameButton);
    expect(mockOnStartGame).toHaveBeenCalledTimes(1);
  });

  it("calls onShowLeaderboard when Leaderboard button is clicked", () => {
    const leaderboardButton = screen.getByText("Leaderboard");
    fireEvent.click(leaderboardButton);
    expect(mockOnShowLeaderboard).toHaveBeenCalledTimes(1);
  });
});
