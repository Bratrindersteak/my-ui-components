export default function toPascalCase(identifier: string): string {
  return identifier.replace(/(^[a-z])|(-[a-z])/g, (match: string): string => {
    return match.at(-1).toUpperCase();
  });
}
