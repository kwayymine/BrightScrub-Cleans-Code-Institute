import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const htmlFiles = [];
const allFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "graft") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else {
      allFiles.push(fullPath);
      if (extname(entry.name).toLowerCase() === ".html") htmlFiles.push(fullPath);
    }
  }
}

await walk(root);
const failures = [];
const targets = new Set(allFiles.map((file) => resolve(file).toLowerCase()));
const hrefPattern = /href\s*=\s*["']([^"']+)["']/gi;

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(hrefPattern)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || /^(https?:|mailto:|tel:|whatsapp:|javascript:)/i.test(href)) continue;
    const pathOnly = href.split("#", 1)[0].split("?", 1)[0];
    if (!pathOnly) continue;
    const candidate = pathOnly.startsWith("/")
      ? resolve(root, `.${pathOnly}`)
      : resolve(file, "..", pathOnly);
    const candidates = candidate.endsWith("/")
      ? [join(candidate, "index.html"), candidate.slice(0, -1) + ".html"]
      : [candidate, candidate + ".html", join(candidate, "index.html")];
    if (!candidates.some((target) => targets.has(resolve(target).toLowerCase()))) {
      failures.push(`${relative(root, file)} -> ${href}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Internal link check passed: ${htmlFiles.length} HTML pages scanned.`);
}
