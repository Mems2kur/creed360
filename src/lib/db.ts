import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { Property, VerificationRequest } from "./types";

/**
 * A tiny JSON-file "database".
 *
 * Good enough to run the site and the admin dashboard on one server (a VPS,
 * Render, Railway…). It will NOT persist on serverless hosts like Vercel,
 * whose file system is read-only — swap these functions for Supabase,
 * Postgres or MongoDB calls when you deploy there. Every page and action
 * only talks to the functions exported below, so that swap stays in this file.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOAD_DIR = path.join(process.cwd(), "storage", "uploads");

const FILES = {
  properties: path.join(DATA_DIR, "properties.json"),
  verifications: path.join(DATA_DIR, "verifications.json"),
};

async function readJson<T>(file: string): Promise<T[]> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T[];
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

// Writes go through a promise chain so two saves never interleave.
let writeQueue: Promise<unknown> = Promise.resolve();
function writeJson<T>(file: string, data: T[]) {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2));
    await fs.rename(tmp, file); // atomic replace
  });
  return writeQueue;
}

export const newId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

// ─── Properties ──────────────────────────────────────────────────────────────

export async function getProperties(): Promise<Property[]> {
  const all = await readJson<Property>(FILES.properties);
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPublishedProperties() {
  return (await getProperties()).filter((p) => p.published);
}

export async function getProperty(id: string) {
  return (await getProperties()).find((p) => p.id === id) ?? null;
}

export async function saveProperty(input: Omit<Property, "createdAt" | "updatedAt"> & { createdAt?: string }) {
  const all = await readJson<Property>(FILES.properties);
  const idx = all.findIndex((p) => p.id === input.id);
  const record: Property = {
    ...input,
    createdAt: idx >= 0 ? all[idx].createdAt : input.createdAt ?? now(),
    updatedAt: now(),
  };
  if (idx >= 0) all[idx] = record;
  else all.push(record);
  await writeJson(FILES.properties, all);
  return record;
}

export async function deleteProperty(id: string) {
  const all = await readJson<Property>(FILES.properties);
  const target = all.find((p) => p.id === id);
  await writeJson(FILES.properties, all.filter((p) => p.id !== id));
  if (target) await Promise.all(target.images.map(deleteUpload));
}

// ─── Verification requests ───────────────────────────────────────────────────

export async function getVerifications(): Promise<VerificationRequest[]> {
  const all = await readJson<VerificationRequest>(FILES.verifications);
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getVerification(id: string) {
  return (await getVerifications()).find((v) => v.id === id) ?? null;
}

export async function createVerification(
  input: Omit<VerificationRequest, "id" | "reference" | "createdAt" | "updatedAt">,
) {
  const all = await readJson<VerificationRequest>(FILES.verifications);
  const nextNumber =
    all.reduce((max, v) => Math.max(max, Number(v.reference.split("-").pop()) || 0), 0) + 1;
  const record: VerificationRequest = {
    ...input,
    id: newId(),
    reference: `C360-VR-${String(nextNumber).padStart(4, "0")}`,
    createdAt: now(),
    updatedAt: now(),
  };
  all.push(record);
  await writeJson(FILES.verifications, all);
  return record;
}

export async function updateVerification(id: string, patch: Partial<VerificationRequest>) {
  const all = await readJson<VerificationRequest>(FILES.verifications);
  const idx = all.findIndex((v) => v.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch, id, updatedAt: now() };
  await writeJson(FILES.verifications, all);
  return all[idx];
}

export async function deleteVerification(id: string) {
  const all = await readJson<VerificationRequest>(FILES.verifications);
  const target = all.find((v) => v.id === id);
  await writeJson(FILES.verifications, all.filter((v) => v.id !== id));
  if (target) await Promise.all(target.documents.map((d) => deleteUpload(d.url)));
}

// ─── File uploads ────────────────────────────────────────────────────────────

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB per file

/**
 * Saves an uploaded File and returns the URL it is served from.
 * Private files (clients' title documents) get a "private-" prefix and the
 * upload route only serves those to a logged-in admin.
 */
export async function saveUpload(file: File, opts: { private?: boolean } = {}): Promise<string> {
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED.has(ext)) throw new Error(`${file.name}: only JPG, PNG, WEBP or PDF files are allowed.`);
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is larger than 8MB.`);
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${opts.private ? "private-" : ""}${newId()}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}

export async function deleteUpload(url: string) {
  const name = path.basename(url);
  await fs.rm(path.join(UPLOAD_DIR, name), { force: true });
}

export function uploadPath(name: string) {
  // basename() strips any "../" so nobody can read files outside the folder
  return path.join(UPLOAD_DIR, path.basename(name));
}
