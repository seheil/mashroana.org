import type { Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { storagePut } from "./storage";

const FIREBASE_JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_VIDEO_BYTES = 45 * 1024 * 1024;

function extensionFromMimeType(mimeType: string) {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov",
  };
  return extensions[mimeType] ?? "bin";
}

async function getVerifiedFirebaseUser(request: Request) {
  const authorization = request.header("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

  if (!token || !projectId) {
    throw new Error("UNAUTHORIZED");
  }

  const verification = await jwtVerify(token, FIREBASE_JWKS, {
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  if (!verification.payload.sub) {
    throw new Error("UNAUTHORIZED");
  }

  return {
    uid: verification.payload.sub,
    email: typeof verification.payload.email === "string" ? verification.payload.email : "",
  };
}

/**
 * Receives a binary image/video from an authenticated Firebase administrator,
 * stores it in the platform object store, and returns its durable public path.
 */
export async function uploadMedia(request: Request, response: Response) {
  try {
    const user = await getVerifiedFirebaseUser(request);
    const mimeType = request.header("content-type")?.split(";")[0]?.toLowerCase() ?? "";
    const fileBody = request.body as Buffer | undefined;

    if (!mimeType.startsWith("image/") && !mimeType.startsWith("video/")) {
      return response.status(415).json({ error: "يسمح برفع الصور والفيديوهات فقط." });
    }

    if (!fileBody || !Buffer.isBuffer(fileBody) || fileBody.byteLength === 0) {
      return response.status(400).json({ error: "لم يتم استلام ملف صالح." });
    }

    const byteLimit = mimeType.startsWith("image/") ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    if (fileBody.byteLength > byteLimit) {
      const maxMegabytes = Math.floor(byteLimit / (1024 * 1024));
      return response.status(413).json({ error: `حجم الملف يتجاوز الحد الأقصى (${maxMegabytes} ميغابايت).` });
    }

    const extension = extensionFromMimeType(mimeType);
    const safeUserId = user.uid.replace(/[^a-zA-Z0-9_-]/g, "_");
    const relativeKey = `media-library/${safeUserId}/${Date.now()}.${extension}`;
    const saved = await storagePut(relativeKey, fileBody, mimeType);

    return response.status(201).json({
      url: saved.url,
      key: saved.key,
      mimeType,
      uploadedBy: user.email,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return response.status(401).json({ error: "انتهت الجلسة أو لا تملك صلاحية رفع الملفات." });
    }
    console.error("[Media upload] failed", error);
    return response.status(500).json({ error: "تعذر حفظ الملف حالياً. حاول مرة أخرى." });
  }
}
