import { isNonEmptyString } from "@/shared/utils/validators";

export function isCourseSlug(value: unknown): value is string {
  return isNonEmptyString(value);
}
