export default function toKebabCase(identifier: string): string {
  return identifier.replace(/[A-Z]/g, (match: string, offset): string => {
    if (offset === 0) {
      return match.toLowerCase();
    } else {
      return '-' + match.toLowerCase();
    }
  });
}
