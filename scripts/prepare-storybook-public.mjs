import { execSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = resolve(root, "storybook-static");
const publicDir = resolve(root, "public/storybook");
const baseHref = "/storybook/";

const include =
  process.env.INCLUDE_STORYBOOK === "1" ||
  process.env.VERCEL === "1" ||
  process.argv.includes("--force");

if (!include) {
  console.info(
    "Skipping Storybook site copy (set INCLUDE_STORYBOOK=1 or use --force; auto-on for Vercel).",
  );
  process.exit(0);
}

if (existsSync(publicDir)) {
  rmSync(publicDir, { recursive: true, force: true });
}
if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}

execSync("pnpm exec storybook build -o storybook-static", {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

cpSync(outDir, publicDir, { recursive: true });

// Relative manager assets break when the URL is `/storybook` (no trailing slash).
const indexPath = resolve(publicDir, "index.html");
const indexHtml = readFileSync(indexPath, "utf8");
if (!indexHtml.includes(`<base href="${baseHref}"`)) {
  writeFileSync(indexPath, indexHtml.replace(/<head>/i, `<head>\n    <base href="${baseHref}" />`));
}

console.info("Copied storybook-static → public/storybook (served at /storybook/)");
