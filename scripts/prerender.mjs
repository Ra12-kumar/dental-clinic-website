// Writes one HTML file per route (content + metadata), plus sitemap.xml and robots.txt.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { render, pages, getMeta, metaTags, structuredData, siteUrl } from "../dist-ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
const escape = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

async function writePage(route, file) {
  const meta = getMeta(route);
  const { tags, canonical } = metaTags(meta);
  const head = [
    `<title>${escape(meta.title)}</title>`,
    ...tags.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escape(content)}" />`),
    canonical && `<link rel="canonical" href="${escape(canonical)}" />`,
    `<script type="application/ld+json">${structuredData()}</script>`,
  ].filter(Boolean).join("\n    ");
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace("</head>", () => `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${render(route)}</div>`);
  const target = path.join("dist", file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}

for (const { path: route } of pages) {
  await writePage(route, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
}
await writePage("/404", "404.html");

const robots = ["User-agent: *", "Allow: /"];
if (siteUrl) {
  const urls = pages.map((p) => `  <url><loc>${escape(siteUrl + p.path)}</loc></url>`).join("\n");
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  robots.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
} else {
  console.warn("! clinic.siteUrl is empty: sitemap.xml and canonical URLs were skipped. Set it in src/config/clinic.js.");
}
await writeFile("dist/robots.txt", `${robots.join("\n")}\n`);
await rm("dist-ssr", { recursive: true, force: true });
console.log(`Prerendered ${pages.length} pages.`);
