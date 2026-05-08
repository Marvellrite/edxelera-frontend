import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .trim()
    .min(1, "NEXT_PUBLIC_API_URL is required")
    .url("NEXT_PUBLIC_API_URL must be a valid URL"),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsedEnv.success) {
  const message = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid environment variables:\n${message}`);
}

export const env = {
  apiUrl: parsedEnv.data.NEXT_PUBLIC_API_URL,
} as const;
