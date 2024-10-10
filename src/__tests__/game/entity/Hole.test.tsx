import { Hole } from '../../../game/entity/Hole';

describe('Hole', () => {
  let hole: Hole;
  const x = 100;
  const y = 100;
  const size = 50;

  beforeEach(() => {
    hole = new Hole(x, y, size);
  });

  test('constructor initializes properties correctly', () => {
    expect(hole.getX()).toBe(x);
    expect(hole.getY()).toBe(y);
    expect(hole.getSize()).toBe(size);
  });

  test('update method logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    hole.update(16);
    expect(consoleSpy).toHaveBeenCalledWith('Hole updated', 16);
    consoleSpy.mockRestore();
  });

  test('render method calls correct canvas methods', () => {
    const mockContext = {
      fillStyle: '',
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
    };

    hole.render(mockContext as unknown as CanvasRenderingContext2D);

    expect(mockContext.fillStyle).toBe('#4A5A31');
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.arc).toHaveBeenCalledWith(x, y, size / 2, 0, Math.PI * 2);
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test('getX returns correct x coordinate', () => {
    expect(hole.getX()).toBe(x);
  });

  test('getY returns correct y coordinate', () => {
    expect(hole.getY()).toBe(y);
  });

  test('getSize returns correct size', () => {
    expect(hole.getSize()).toBe(size);
  });
});
