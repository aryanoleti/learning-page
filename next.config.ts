import type { NextConfig } from "next";

// basePath must match the repo name when this is served from GitHub Pages.
// Derived from the Actions environment so the same code works in any repo.
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "learning-page";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? `/${repo}` : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repo}/` : undefined,
  // Directory-style output (learn/index.html) — this must stay true, and the
  // deploy workflow must NOT pass `static_site_generator: next` to
  // configure-pages, which overwrites this and breaks every route but "/".
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
