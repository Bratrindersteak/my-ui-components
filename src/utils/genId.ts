import toPascalCase from './toPascalCase';

const prefixes: Map<string, number> = new Map();

export default function genId(prefix: string): string {
  const index: number = prefixes.get(prefix) || 0;

  prefixes.set(prefix, index + 1);

  return `${toPascalCase(prefix)}${index}`;
}
