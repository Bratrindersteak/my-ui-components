export default function toCamelCase(identifier: string): string {
  return identifier.replace(/(^[A-Z])|(-[a-z])/g, (match: string, p1, p2, offset): string => {
    if (offset === 0) {
      return match.toLowerCase();
    } else {
      return match.at(-1).toUpperCase();
    }
  });
}
