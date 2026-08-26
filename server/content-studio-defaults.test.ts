import { describe, expect, it } from "vitest";
import { mergeAboutContent, mergeHomepageContent, mergeNavigationContent } from "../shared/content-studio-defaults";

describe("content studio defaults", () => {
  it("keeps every homepage section in a valid order even with incomplete saved settings", () => {
    const content = mergeHomepageContent({ sectionOrder: ["donate", "programs", "invalid" as never] });
    expect(content.sectionOrder).toEqual(["donate", "programs", "impact", "priorities", "partnerships", "media"]);
    expect(content.hero.title).toContain("العطاء");
    expect(content.hero.trustPoints).toHaveLength(3);
    expect(content.hero.sideCtaLabel).toContain("الشفافية");
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

  it("keeps four structured about-page work areas when saved data is incomplete", () => {
    const about = mergeAboutContent({ workAreas: [{ mark: "01", title: "عنوان معتمد", text: "وصف معتمد" }] });
    expect(about.workAreas).toHaveLength(4);
    expect(about.workAreas[0]).toMatchObject({ title: "عنوان معتمد", text: "وصف معتمد" });
    expect(about.governanceTitle).toContain("للمراجعة");
  });
});
