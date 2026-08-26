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

  it("adds public discovery files and organization metadata without exposing administration URLs", () => {
    const indexSource = readProjectFile("client/index.html");
    const robots = readProjectFile("client/public/robots.txt");
    const sitemap = readProjectFile("client/public/sitemap.xml");
    expect(indexSource).toContain('rel="canonical"');
    expect(indexSource).toContain('application/ld+json');
    expect(indexSource).toContain('"@type": "NGO"');
    expect(robots).toContain("Disallow: /admin");
    expect(robots).toContain("Sitemap: https://mashroana.org/sitemap.xml");
    expect(sitemap).toContain("https://mashroana.org/transparency");
    expect(sitemap).not.toContain("/admin");
  });

  it("provides keyboard navigation support and avoids displaying unverified zero impact counters", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const navigation = readProjectFile("client/src/components/Navigation.tsx");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    expect(appSource).toContain('href="#main-content"');
    expect(appSource).toContain('id="main-content"');
    expect(appSource).toContain('lazy(() => import("./pages/Projects"))');
    expect(navigation).toContain('aria-expanded={isOpen}');
    expect(navigation).toContain('aria-controls="mobile-navigation"');
    expect(homeSource).toContain("hasVerifiedImpactValue");
    expect(homeSource).toContain("قيد التوثيق");
  });

  it("uses labelled controls and accessible submission states in the public contact form", () => {
    const contactSource = readProjectFile("client/src/pages/Contact.tsx");
    expect(contactSource).toContain('htmlFor="contact-name"');
    expect(contactSource).toContain('id="contact-message"');
    expect(contactSource).toContain('role="status"');
    expect(contactSource).toContain('role="alert"');
    expect(contactSource).toContain("disabled={isSubmitting}");
    expect(contactSource).not.toContain('alert("حدث خطأ في إرسال الرسالة")');
  });

  it("defines minimal, consent-based partner and volunteer pathways ready for restricted Firestore rules", () => {
    const schemas = readProjectFile("shared/firestore-schemas.ts");
    const operations = readProjectFile("client/src/lib/firestore-ops.ts");
    const forms = readProjectFile("client/src/components/InterestForms.tsx");
    const appSource = readProjectFile("client/src/App.tsx");
    const rulesGuide = readProjectFile("FIREBASE_SECURITY_SETUP.md");
    expect(schemas).toContain('PARTNER_INQUIRIES: "partnerInquiries"');
    expect(schemas).toContain('VOLUNTEER_APPLICATIONS: "volunteerApplications"');
    expect(operations).toContain("addPartnerInquiry");
    expect(operations).toContain("addVolunteerApplication");
    expect(operations).toContain("updatePartnerInquiryStatus");
    expect(operations).toContain("updateVolunteerApplicationStatus");
    expect(forms).toContain("نطلب الحد الأدنى من المعلومات");
    expect(forms).toContain("لا نطلب في هذه المرحلة أي وثائق شخصية حساسة");
    expect(forms).toContain("consent: false");
    expect(appSource).toContain('<Route path={"/volunteer"} component={Volunteer} />');
    expect(rulesGuide).toContain("match /partnerInquiries/{inquiryId}");
    expect(rulesGuide).toContain("match /volunteerApplications/{applicationId}");
    const volunteerPage = readProjectFile("client/src/pages/Volunteer.tsx");
    expect(volunteerPage).toContain("سياسة التعامل مع طلبات التطوع");
    expect(volunteerPage).toContain("القبول أو الاعتذار");
  });

  it("publishes a transparent impact-methodology route without inventing impact numbers", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const methodology = readProjectFile("client/src/pages/ImpactMethodology.tsx");
    const transparency = readProjectFile("client/src/pages/Transparency.tsx");
    expect(appSource).toContain('<Route path={"/impact-methodology"} component={ImpactMethodology} />');
    expect(methodology).toContain("لا رقم بلا سياق");
    expect(methodology).toContain("لا أثر بلا مصدر");
    expect(methodology).toContain("قيد التوثيق");
    expect(methodology).toContain("لا تُنشر بيانات تعريفية");
    expect(transparency).toContain('href="/impact-methodology"');
  });

  it("provides an honest English-facing partner brief without presenting it as legal verification", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const brief = readProjectFile("client/src/pages/InternationalBrief.tsx");
    const partnerships = readProjectFile("client/src/pages/Partnerships.tsx");
    expect(appSource).toContain('<Route path={"/international-brief"} component={InternationalBrief} />');
    expect(brief).toContain("This brief is not a funding proposal, financial report, or legal verification document.");
    expect(brief).toContain("Public contact point");
    expect(partnerships).toContain("Open English partner brief");
  });

  it("aligns the public privacy notice with the website’s actual forms and unconfirmed donation flow", () => {
    const privacy = readProjectFile("client/src/pages/Privacy.tsx");
    expect(privacy).toContain("لا يعالج هذا الموقع بطاقات دفع أو مبالغ تبرع");
    expect(privacy).toContain("لا توجد حالياً نشرة بريدية أو CRM");
    expect(privacy).toContain("عند طلب شراكة");
    expect(privacy).toContain("عند طلب تطوع");
    expect(privacy).toContain("Firestore");
    expect(privacy).not.toContain("advanced protection systems");
  });
});
