import { promises as fs } from "fs";
import path from "path";
import { isAdmin } from "@/lib/auth";
import { uploadPath } from "@/lib/db";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

// Serves files saved by saveUpload(). Clients' private documents are admin-only.
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (name.startsWith("private-") && !(await isAdmin())) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const data = await fs.readFile(uploadPath(name));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[path.extname(name).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": name.startsWith("private-") ? "private, no-store" : "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
