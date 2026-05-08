import { z } from "zod";

const fallbackBackendUrl = "http://192.168.10.20:8000";
const frontendApiUrl = "/api/proxy/api/v1";

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z
    .string()
    .trim()
    .url("NEXT_PUBLIC_BACKEND_URL must be a valid URL")
    .default(fallbackBackendUrl),
  NEXT_PUBLIC_API_URL: z.literal(frontendApiUrl),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_API_URL: frontendApiUrl,
});

if (!parsedEnv.success) {
  const message = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid environment variables:\n${message}`);
}

const env = {
  backendUrl: parsedEnv.data.NEXT_PUBLIC_BACKEND_URL,
  apiUrl: parsedEnv.data.NEXT_PUBLIC_API_URL,
} as const;

export default env;
