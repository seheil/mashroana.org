import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("grant-ready platform foundations", () => {
  it("defines persistent collections for media, tasks and public documents", () => {
    const schemas = readProjectFile("shared/firestore-schemas.ts");
    expect(schemas).toContain('MEDIA: "media"');
    expect(schemas).toContain('TASKS: "tasks"');
    expect(schemas).toContain('DOCUMENTS: "documents"');
    expect(schemas).toContain("interface FirestoreMediaItem");
    expect(schemas).toContain("interface FirestoreTask");
    expect(schemas).toContain("interface FirestoreDocument");
  });

  it("protects uploads with Firebase token verification and permanent object storage", () => {
    const uploadHandler = readProjectFile("server/mediaUpload.ts");
    expect(uploadHandler).toContain("jwtVerify(token, FIREBASE_JWKS");
    expect(uploadHandler).toContain("https://securetoken.google.com/${projectId}");
    expect(uploadHandler).toContain("storagePut(relativeKey, fileBody, mimeType)");
    expect(uploadHandler).toContain("MAX_IMAGE_BYTES");
    expect(uploadHandler).toContain("MAX_VIDEO_BYTES");
  });

  it("uses the dynamic media library for both the new library page and legacy gallery URL", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const mediaLibrary = readProjectFile("client/src/pages/MediaLibrary.tsx");
    expect(appSource).toContain('<Route path={"/gallery"} component={MediaLibrary} />');
    expect(appSource).toContain('<Route path={"/media"} component={MediaLibrary} />');
    expect(mediaLibrary).toContain("subscribeToMediaItems");
    expect(mediaLibrary).toContain('item.status === "published"');
  });

  it("renders the homepage from live project and impact subscriptions", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    expect(homeSource).toContain("subscribeToProjects");
    expect(homeSource).toContain("subscribeToSettings");
    expect(homeSource).not.toContain("foundationData.programs.map");
  });
});
