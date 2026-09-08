import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (extname(entry.name).toLowerCase() === ".html") htmlFiles.push(fullPath);
  }
}

await walk(root);
const failures = [];

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  const relativeName = relative(root, file);

  if (!/^<!doctype html>/i.test(source.trim())) {
    failures.push(`${relativeName}: missing doctype`);
  }
  if (!/<html\b[^>]*\blang=/i.test(source)) {
    failures.push(`${relativeName}: missing html lang attribute`);
  }
  for (const image of source.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=\s*["']/i.test(image[0])) {
      failures.push(`${relativeName}: image missing alt text`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Site checks passed: ${htmlFiles.length} HTML pages, all images have alt attributes.`);
}
