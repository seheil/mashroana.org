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
  it("يوحد جميع مسارات الإدارة على لوحة Firestore الرسمية", () => {
    expect(appSource).toContain('<Route path={"/admin"} component={AdminDashboard} />');
    expect(appSource).toContain('<Route path={"/admin-panel"} component={AdminDashboard} />');
    expect(appSource).not.toContain('component={AdminPanel}');
    expect(appSource).not.toContain('component={Admin}');
  });

  it("يرسل نموذج التواصل إلى عملية Firestore الموحدة", () => {
    expect(contactSource).toContain('import { addContactMessage } from "@/lib/firestore-ops"');
    expect(contactSource).toContain('await addContactMessage(formData)');
    expect(contactSource).not.toContain('collection(db, "messages")');
  });
});
