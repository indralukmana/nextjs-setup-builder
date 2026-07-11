import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

const serverParsed = serverSchema.safeParse(processEnv);
const clientParsed = clientSchema.safeParse(processEnv);

if (!serverParsed.success) {
  console.error("Invalid server environment variables:", serverParsed.error.flatten().fieldErrors);
  throw new Error("Invalid server environment variables");
}

if (!clientParsed.success) {
  console.error("Invalid client environment variables:", clientParsed.error.flatten().fieldErrors);
  throw new Error("Invalid client environment variables");
}

export const env = {
  ...serverParsed.data,
  ...clientParsed.data,
};
