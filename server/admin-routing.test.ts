import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const appSource = readFileSync(
  resolve(process.cwd(), "client/src/App.tsx"),
  "utf8"
);
const contactSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/Contact.tsx"),
  "utf8"
);

describe("المسارات الإدارية ومصدر الرسائل", () => {
  it("يوحد مسارات الإدارة على بوابة محتوى GitHub دون Firebase", () => {
    expect(appSource).toContain('<Route path={"/admin"} component={GitHubAdminHub} />');
    expect(appSource).toContain('<Route path={"/admin-panel"} component={GitHubAdminHub} />');
    expect(appSource).not.toContain('AdminDashboard');
    expect(appSource).not.toContain('AdminLogin');
  });

  it("يفتح نموذج التواصل رسالة واتساب صريحة ولا يخزن البيانات في الموقع", () => {
    expect(contactSource).toContain('foundationData.contact.whatsapp');
    expect(contactSource).toContain('لا تُحفظ هذه البيانات في الموقع');
    expect(contactSource).not.toContain('addContactMessage');
  });
});
