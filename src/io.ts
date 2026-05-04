import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { SafetydeckError } from './errors.js';

export async function readJsonFile(path: string): Promise<unknown> {
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new SafetydeckError(`Could not read JSON file ${path}: ${message}`, 'READ_JSON_FAILED');
  }
}

export async function writeTextFile(path: string, content: string): Promise<void> {
  const fullPath = resolve(path);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, content, 'utf8');
}
