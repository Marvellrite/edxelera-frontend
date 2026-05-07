import { isNonEmptyString } from "@/lib/validators";

export function isCourseSlug(value: unknown): value is string {
  return isNonEmptyString(value);
}
