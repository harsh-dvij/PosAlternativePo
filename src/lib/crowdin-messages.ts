import "server-only";

import { readFile } from "fs/promises";
import path from "path";

function flattenMessages(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenMessages(value as Record<string, unknown>, fullKey));
    }
  }

  return result;
}

export async function getCrowdinMessages(locale: string): Promise<Record<string, string>> {
  const filePath = path.join(process.cwd(), "locales", `${locale}.json`);
  const raw = await readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;

  return flattenMessages(data);
}
