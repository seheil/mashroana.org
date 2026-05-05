import { describe, it, expect } from "vitest";
import { galleryImages } from "@/../../shared/gallery-images";

describe("Gallery Images", () => {
  it("should have at least 9 gallery items", () => {
    expect(galleryImages.length).toBeGreaterThanOrEqual(9);
  });

  it("should have required properties for each image", () => {
    galleryImages.forEach((img) => {
      expect(img).toHaveProperty("id");
      expect(img).toHaveProperty("title");
      expect(img).toHaveProperty("titleEn");
      expect(img).toHaveProperty("description");
      expect(img).toHaveProperty("descriptionEn");
      expect(img).toHaveProperty("image");
      expect(img).toHaveProperty("category");
    });
  });

  it("should have valid image paths", () => {
    galleryImages.forEach((img) => {
      expect(img.image).toMatch(/^\/images\/.*\.jpg$/);
    });
  });

  it("should have valid categories", () => {
    const validCategories = [
      "social",
      "education",
      "economic",
      "environment",
      "health",
    ];
    galleryImages.forEach((img) => {
      expect(validCategories).toContain(img.category);
    });
  });

  it("should have unique IDs", () => {
    const ids = galleryImages.map((img) => img.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have Arabic and English titles", () => {
    galleryImages.forEach((img) => {
      expect(img.title.length).toBeGreaterThan(0);
      expect(img.titleEn.length).toBeGreaterThan(0);
    });
  });

  it("should have Arabic and English descriptions", () => {
    galleryImages.forEach((img) => {
      expect(img.description.length).toBeGreaterThan(0);
      expect(img.descriptionEn.length).toBeGreaterThan(0);
    });
  });

  it("should have specific programs", () => {
    const titles = galleryImages.map((img) => img.title);
    expect(titles).toContain("كفالة الأيتام");
    expect(titles).toContain("الدعم التعليمي");
    expect(titles).toContain("التمكين الاقتصادي");
    expect(titles).toContain("زراعة النخيل");
    expect(titles).toContain("الخدمات الصحية");
  });

  it("should have correct category distribution", () => {
    const socialCount = galleryImages.filter(
      (img) => img.category === "social"
    ).length;
    const healthCount = galleryImages.filter(
      (img) => img.category === "health"
    ).length;

    expect(socialCount).toBeGreaterThan(0);
    expect(healthCount).toBeGreaterThan(0);
  });
});
