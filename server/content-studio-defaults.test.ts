import { describe, expect, it } from "vitest";
import { mergeHomepageContent, mergeNavigationContent } from "../shared/content-studio-defaults";

describe("content studio defaults", () => {
  it("keeps every homepage section in a valid order even with incomplete saved settings", () => {
    const content = mergeHomepageContent({ sectionOrder: ["donate", "programs", "invalid" as never] });
    expect(content.sectionOrder).toEqual(["donate", "programs", "impact", "priorities", "partnerships", "media"]);
    expect(content.hero.title).toContain("العطاء");
  });

  it("protects the home and contact links from being hidden or redirected", () => {
    const navigation = mergeNavigationContent({
      items: [
        { id: "home", label: "بداية", href: "/external", enabled: false, order: 9 },
        { id: "contact", label: "اتصلي بنا", href: "/elsewhere", enabled: false, order: 1 },
      ],
    });
    expect(navigation.items.find((item) => item.id === "home")).toMatchObject({ href: "/", enabled: true, label: "بداية" });
    expect(navigation.items.find((item) => item.id === "contact")).toMatchObject({ href: "/contact", enabled: true, label: "اتصلي بنا" });
  });
});
