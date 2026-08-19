import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = "dist";

await copyFile(join(dist, "index.html"), join(dist, "404.html"));

await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://ganowacek.github.io/personal_website/</loc></url>\n</urlset>\n`,
);
