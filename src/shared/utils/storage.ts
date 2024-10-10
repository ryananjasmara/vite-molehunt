export function setLocalStorageItem(key: string, value: unknown): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
}

export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return defaultValue;
  }
}

export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from local storage:", error);
  }
}
