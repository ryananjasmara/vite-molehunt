import { GameEngine } from "../../../game/engine/GameEngine";
import { Mole } from "../../../game/entity/Mole";

jest.mock("../../../game/entity/Mole");

jest.mock("../../../assets/wemadebgm.mp3", () => "mocked-audio-file");
jest.mock("../../../assets/pop.mp3", () => "mocked-audio-file");

describe("GameEngine", () => {
  let gameEngine: GameEngine;
  const mockSetScore = jest.fn();
  const mockSetTimer = jest.fn();
  const canvasId = "test-canvas";
  const width = 800;
  const height = 600;

  beforeEach(() => {
    const mockCanvas = document.createElement("canvas");
    const mockContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
    };
    jest.spyOn(document, "getElementById").mockReturnValue(mockCanvas);
    jest.spyOn(mockCanvas, "getContext").mockReturnValue(mockContext as unknown as CanvasRenderingContext2D);

    global.Audio = jest.fn().mockImplementation(() => ({
      play: jest.fn().mockResolvedValue(undefined),
      pause: jest.fn(),
      loop: false,
      currentTime: 0,
    }));

    gameEngine = new GameEngine(
      canvasId,
      mockSetScore,
      mockSetTimer,
      width,
      height
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("constructor initializes properties correctly", () => {
    expect(gameEngine).toBeDefined();
    expect(gameEngine["width"]).toBe(width);
    expect(gameEngine["height"]).toBe(height);
    expect(gameEngine["setScore"]).toBe(mockSetScore);
    expect(gameEngine["setTimer"]).toBe(mockSetTimer);
  });

  test("start method initializes game state", async () => {
    await gameEngine.start();
    expect(gameEngine["gameStarted"]).toBe(true);
    expect(gameEngine["remainingTime"]).toBe(gameEngine["gameTime"]);
    expect(mockSetScore).toHaveBeenCalledWith(0);
    expect(mockSetTimer).toHaveBeenCalledWith(30);
  });

  test("stop method pauses the game", () => {
    gameEngine.stop();
    expect(gameEngine["gameStarted"]).toBe(false);
    expect(gameEngine["isPaused"]).toBe(true);
    expect(gameEngine["remainingTime"]).toBe(gameEngine["gameTime"]);
    expect(mockSetTimer).toHaveBeenCalledWith(30);
  });

  test("cleanup method stops the game and removes event listeners", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    gameEngine.cleanup();
    expect(gameEngine["gameStarted"]).toBe(false);
    expect(gameEngine["isPaused"]).toBe(true);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  test("handleClick increases score when mole is clicked", () => {
    const mockMole = new Mole(0, 0, 0);
    (mockMole.isClicked as jest.Mock).mockReturnValue(true);
    gameEngine["moles"] = [mockMole];

    const mockEvent = new MouseEvent("click", { clientX: 100, clientY: 100 });
    gameEngine["handleClick"](mockEvent);

    expect(gameEngine["score"]).toBe(1);
    expect(mockSetScore).toHaveBeenCalledWith(1);
    expect(mockMole.hide).toHaveBeenCalled();
  });

  test("isSoundOn getter and setter", () => {
    expect(gameEngine.isSoundOn).toBe(true);
    gameEngine.isSoundOn = false;
    expect(gameEngine.isSoundOn).toBe(false);
  });
});
