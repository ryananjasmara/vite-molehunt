import { Mole } from "../../../game/entity/Mole";

jest.mock("../../../assets/mole.png", () => "mocked-mole-image");

describe("Mole", () => {
  let mole: Mole;
  const x = 100;
  const y = 100;
  const size = 50;

  beforeEach(() => {
    mole = new Mole(x, y, size);
  });

  test("constructor initializes properties correctly", () => {
    expect(mole.getX()).toBe(x);
    expect(mole.getY()).toBe(y);
    expect(mole.getIsVisible()).toBe(false);
  });

  test("show method makes the mole visible", () => {
    mole.show();
    expect(mole.getIsVisible()).toBe(true);
  });

  test("hide method makes the mole invisible", () => {
    mole.show();
    mole.hide();
    expect(mole.getIsVisible()).toBe(false);
  });

  test("isClicked returns true when clicked within mole area", () => {
    mole.show();
    expect(mole.isClicked(x, y)).toBe(true);
    expect(mole.isClicked(x + size / 2, y)).toBe(true);
    expect(mole.isClicked(x - size / 2, y)).toBe(true);
  });

  test("isClicked returns false when clicked outside mole area", () => {
    mole.show();
    expect(mole.isClicked(x + size, y + size)).toBe(false);
    expect(mole.isClicked(x - size, y - size)).toBe(false);
  });

  test("isClicked returns false when mole is not visible", () => {
    expect(mole.isClicked(x, y)).toBe(false);
  });

  test("update hides mole after visible duration", () => {
    mole.show();
    mole.update(1000);
    expect(mole.getIsVisible()).toBe(false);
  });

  test("render calls correct drawing method", () => {
    const mockContext = {
      drawImage: jest.fn(),
      fillStyle: "",
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
    };

    mole.show();
    mole.render(mockContext as unknown as CanvasRenderingContext2D);

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.arc).toHaveBeenCalled();
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test("isLoaded returns false initially", () => {
    expect(mole.isLoaded()).toBe(false);
  });
});
