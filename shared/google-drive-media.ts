export type DriveMediaKind = "image" | "video";

const DRIVE_HOSTS = new Set(["drive.google.com", "www.drive.google.com"]);

function getDriveFileId(value: string) {
  try {
    const url = new URL(value.trim());
    if (!DRIVE_HOSTS.has(url.hostname)) return null;
    const byPath = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
    const byQuery = url.searchParams.get("id");
    return byPath || (byQuery && /^[a-zA-Z0-9_-]+$/.test(byQuery) ? byQuery : null);
  } catch {
    return null;
  }
}

export function normaliseGoogleDriveMediaUrl(value: string, kind: DriveMediaKind) {
  const fileId = getDriveFileId(value);
  if (!fileId) return null;
  return kind === "video"
    ? `https://drive.google.com/file/d/${fileId}/preview`
    : `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function isGoogleDriveMediaUrl(value: string) {
  return getDriveFileId(value) !== null;
}
