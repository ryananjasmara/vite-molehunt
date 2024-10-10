import { debounce } from "../../../game/utils/debounce";

describe("debounce", () => {
  jest.useFakeTimers();

  test("debounced function is called after the specified delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("test");
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(999);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  test("debounced function is called only once for multiple calls within delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("test1");
    debouncedFn("test2");
    debouncedFn("test3");

    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test3");
  });

  test("debounced function uses default delay when not specified", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn);

    debouncedFn("test");
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(499);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  test("debounced function resets timer on subsequent calls", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("test1");
    jest.advanceTimersByTime(500);

    debouncedFn("test2");
    jest.advanceTimersByTime(999);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test2");
  });
});
