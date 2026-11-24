// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Fully static output: Cloudflare serves ./dist via Workers Static Assets (see wrangler.json).
export default defineConfig({
  site: "https://tncalendar.com",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap({ filter: (p) => !p.includes("/404") })],
});
