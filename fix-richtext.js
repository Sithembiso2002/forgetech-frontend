// fix-richtext.js
// Converts <p|div|span>{var.field}</p|div|span> to <RichText html={var.field} ... />
// and adds missing `import RichText from "@/components/RichText"` lines.
// Handles multi-line import statements correctly.

const fs = require("fs");
const path = require("path");

const FIELDS = "description|content|overview|results|summary|message";

const jsxPattern = new RegExp(
  "<(p|div|span)([^>]*)>\\s*\\{([a-zA-Z_$][\\w$]*(?:\\.[a-zA-Z_$][\\w$]*)*\\.(?:" +
    FIELDS +
    "))\\}\\s*</\\1>",
  "gs"
);

const IMPORT_LINE = 'import RichText from "@/components/RichText";';

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

// Find the line index of the END of the last import block.
// Correctly handles multi-line imports (import { a, b, c } from "...").
function findLastImportEndLine(lines) {
  let lastEnd = -1;
  let insideImport = false;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!insideImport && trimmed.startsWith("import ")) {
      insideImport = true;
    }
    if (insideImport && /;\s*$/.test(trimmed)) {
      lastEnd = i;
      insideImport = false;
    }
  }
  return lastEnd;
}

function addImportIfMissing(content) {
  if (!content.includes("<RichText")) return { content, changed: false };
  if (/import\s+RichText\s+from/.test(content)) {
    return { content, changed: false };
  }

  const lines = content.split("\n");
  const lastEnd = findLastImportEndLine(lines);

  if (lastEnd >= 0) {
    lines.splice(lastEnd + 1, 0, IMPORT_LINE);
  } else {
    // No imports found. Insert after "use client" / "use server" if present.
    let insertAt = 0;
    for (let i = 0; i < Math.min(lines.length, 5); i++) {
      if (/^["']use (client|server)["'];?\s*$/.test(lines[i].trim())) {
        insertAt = i + 1;
        break;
      }
    }
    lines.splice(insertAt, 0, IMPORT_LINE, "");
  }

  return { content: lines.join("\n"), changed: true };
}

const root = path.join("apps", "website", "src");
const files = walk(root);
let convertedCount = 0;
let importCount = 0;

console.log("Scanning " + files.length + " .tsx files under " + root + "\n");

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let modified = false;

  jsxPattern.lastIndex = 0;
  const willConvert = jsxPattern.test(content);
  jsxPattern.lastIndex = 0;

  if (willConvert) {
    fs.writeFileSync(file + ".bak", content);
    content = content.replace(jsxPattern, '<RichText html={$3}$2 as="$1" />');
    console.log("[converted]   " + file);
    convertedCount++;
    modified = true;
  }

  const { content: withImport, changed: importAdded } = addImportIfMissing(content);
  if (importAdded) {
    content = withImport;
    console.log("[import add]  " + file);
    importCount++;
    modified = true;
  }

  if (modified) fs.writeFileSync(file, content);
}

console.log("\n===== Summary =====");
console.log("Files converted: " + convertedCount);
console.log("Imports added:   " + importCount);