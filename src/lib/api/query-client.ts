export type QueryKey = readonly string[];

export function createQueryKey(...parts: string[]): QueryKey {
  return parts;
}
