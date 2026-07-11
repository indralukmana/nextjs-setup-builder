import { env } from "@/env";

export const siteConfig = {
  name: "Monis Setup Builder",
  description:
    "Design your dream Bali workspace and rent desks, chairs, and accessories from monis.rent.",
  get url() {
    return env.NEXT_PUBLIC_SITE_URL;
  },
} as const;
