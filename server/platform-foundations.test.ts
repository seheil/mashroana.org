import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("أسس موقع المؤسسة الثابت", () => {
  it("يستخدم ملف محتوى واحداً خاضعاً لإدارة GitHub للصفحات العامة", () => {
    const store = readProjectFile("client/src/content/static-content.ts");
    const content = readProjectFile("client/src/content/site-content.json");
    expect(store).toContain("site-content.json");
    expect(content).toContain('"projects"');
    expect(content).toContain('"donationPriorities"');
    expect(content).toContain('"media"');
  });

  it("يربط الصفحة الرئيسية والمشاريع والإنجازات والوسائط والشفافية بالمحتوى الثابت", () => {
    for (const page of ["Home.tsx", "Projects.tsx", "Achievements.tsx", "MediaLibrary.tsx", "Transparency.tsx"]) {
      expect(readProjectFile(`client/src/pages/${page}`)).toContain("staticSiteContent");
    }
  });

  it("يعرض الأولويات المنشورة فقط ولا ينشئ حالة عاجلة افتراضية", () => {
    const notice = readProjectFile("client/src/components/DonationPriorityNotice.tsx");
    const advisor = readProjectFile("client/src/components/SadaqahAdvisor.tsx");
    expect(notice).toContain('priority.status === "published"');
    expect(advisor).toContain('priority.status === "published"');
    expect(readProjectFile("client/src/content/site-content.json")).toContain('"donationPriorities": []');
  });

  it("يوفر بوابة إدارة GitHub وملفات CMS دون شاشة Firebase", () => {
    const app = readProjectFile("client/src/App.tsx");
    const hub = readProjectFile("client/src/pages/GitHubAdminHub.tsx");
    expect(app).toContain("GitHubAdminHub");
    expect(hub).toContain("/cms/");
    expect(existsSync(resolve(process.cwd(), "client/public/cms/config.yml"))).toBe(true);
    const cms = readProjectFile("client/public/cms/config.yml");
    expect(cms).toContain("name: github");
    expect(cms).toContain("name: homepage");
    expect(cms).toContain("name: navigation");
    expect(cms).toContain("name: about");
  });

  it("يتضمن إعداد Vercel صريحاً لبناء Vite ومسارات SPA", () => {
    const vercel = readProjectFile("vercel.json");
    expect(vercel).toContain('"framework": "vite"');
    expect(vercel).toContain('"buildCommand": "pnpm install --frozen-lockfile && pnpm build"');
    expect(vercel).toContain('"handle": "filesystem"');
    expect(vercel).toContain('"dest": "/index.html"');
  });

  it("يرسل نماذج التواصل والشراكة والتطوع إلى واتساب فقط", () => {
    const contact = readProjectFile("client/src/pages/Contact.tsx");
    const forms = readProjectFile("client/src/components/InterestForms.tsx");
    expect(contact).toContain("فتح WhatsApp لإرسال الرسالة");
    expect(forms).toContain("فتح WhatsApp لإرسال طلب الشراكة");
    expect(forms).toContain("فتح WhatsApp لإرسال طلب التطوع");
    expect(contact).not.toContain("firestore-ops");
    expect(forms).not.toContain("firestore-ops");
  });
});
