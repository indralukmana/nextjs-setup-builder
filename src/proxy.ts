import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip locale routing for Storybook static files under /storybook.
  matcher: "/((?!api|trpc|_next|_vercel|storybook|.*\\..*).*)",
};
