import { auth } from "@/lib/firebase";

export type UploadedMedia = {
  url: string;
  key: string;
  mimeType: string;
  uploadedBy: string;
};

const IMAGE_LIMIT = 12 * 1024 * 1024;
const VIDEO_LIMIT = 45 * 1024 * 1024;

export async function uploadMediaFile(file: File): Promise<UploadedMedia> {
  const user = auth.currentUser;
  if (!user) throw new Error("يجب تسجيل الدخول قبل رفع ملف.");

  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    throw new Error("يسمح برفع الصور أو الفيديوهات فقط.");
  }

  const limit = file.type.startsWith("image/") ? IMAGE_LIMIT : VIDEO_LIMIT;
  if (file.size > limit) {
    const maxMegabytes = Math.floor(limit / (1024 * 1024));
    throw new Error(`حجم الملف أكبر من الحد الأقصى المسموح (${maxMegabytes} ميغابايت).`);
  }

  const token = await user.getIdToken();
  const response = await fetch("/api/media/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": file.type,
    },
    body: file,
  });

  const result = (await response.json().catch(() => ({}))) as UploadedMedia & { error?: string };
  if (!response.ok) throw new Error(result.error || "تعذر رفع الملف.");

  return result;
}
