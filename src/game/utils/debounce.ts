export function debounce<T>(func: (value: T) => void, delay: number = 500): (value: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestValue: T;

  return (value: T) => {
    latestValue = value;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(latestValue);
    }, delay);
  };
}
