import { isNonEmptyString } from "@/lib/utils/validators";

export function isCourseSlug(value: unknown): value is string {
  return isNonEmptyString(value);
}
