export function isValidObject<T>(
  obj: unknown,
  properties: (keyof T)[]
): obj is T {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  return properties.every((key) => key in obj);
}
