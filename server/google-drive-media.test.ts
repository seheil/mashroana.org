import { describe, expect, it } from "vitest";
import { isGoogleDriveMediaUrl, normaliseGoogleDriveMediaUrl } from "../shared/google-drive-media";

describe("Google Drive media links", () => {
  it("normalises a shared image link into a viewable Drive image URL", () => {
    expect(normaliseGoogleDriveMediaUrl("https://drive.google.com/file/d/abc_123-DEF/view?usp=sharing", "image"))
      .toBe("https://drive.google.com/uc?export=view&id=abc_123-DEF");
  });

  it("normalises a shared video link into Drive preview mode", () => {
    expect(normaliseGoogleDriveMediaUrl("https://drive.google.com/open?id=abc_123-DEF", "video"))
      .toBe("https://drive.google.com/file/d/abc_123-DEF/preview");
  });

  it("rejects non-Drive and malformed links", () => {
    expect(isGoogleDriveMediaUrl("https://example.org/photo.jpg")).toBe(false);
    expect(normaliseGoogleDriveMediaUrl("not a URL", "image")).toBeNull();
  });
});
