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

  it("provides a media-kit route with an approval-based identity and media-use policy", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const mediaKit = readProjectFile("client/src/pages/MediaKit.tsx");
    const library = readProjectFile("client/src/pages/MediaLibrary.tsx");
    expect(appSource).toContain('<Route path={"/media-kit"} component={MediaKit} />');
    expect(mediaKit).toContain("بموافقة مسبقة");
    expect(mediaKit).toContain("استخدام غير مسموح دون موافقة");
    expect(mediaKit).toContain("لا تعرض الصفحة حالياً شعاراً أو ملفات تنزيل");
    expect(library).toContain('href="/media-kit"');
  });

  it("makes the media-library detail dialog keyboard accessible", () => {
    const library = readProjectFile("client/src/pages/MediaLibrary.tsx");
    expect(library).toContain('role="dialog"');
    expect(library).toContain('aria-modal="true"');
    expect(library).toContain('event.key === "Escape"');
    expect(library).toContain("activeTriggerRef.current?.focus()");
    expect(library).toContain("closeButtonRef.current?.focus()");
  });

  it("provides an Arabic partner brief with clear collaboration boundaries", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const partnerBrief = readProjectFile("client/src/pages/PartnerBriefArabic.tsx");
    const partnerships = readProjectFile("client/src/pages/Partnerships.tsx");
    expect(appSource).toContain('<Route path={"/partner-brief"} component={PartnerBriefArabic} />');
    expect(partnerBrief).toContain("لا تمثل عرض تمويل نهائياً");
    expect(partnerBrief).toContain("العناية الواجبة");
    expect(partnerBrief).toContain("ما لا يفترضه هذا الموجز");
    expect(partnerships).toContain("عرض الموجز العربي");
  });

  it("prevents indefinite public loading states when Firestore does not answer", () => {
    const projects = readProjectFile("client/src/pages/Projects.tsx");
    const media = readProjectFile("client/src/pages/MediaLibrary.tsx");
    const transparency = readProjectFile("client/src/pages/Transparency.tsx");
    expect(projects).toContain("6000");
    expect(media).toContain("6000");
    expect(transparency).toContain("6000");
    expect(projects).toContain("لم تتوفر بيانات المشاريع في الوقت الحالي");
    expect(media).toContain("لا نعرض صوراً تجريبية");
    expect(transparency).toContain("لا توجد وثائق منشورة متاحة للعرض");
  });

  it("keeps the donation flow honest and accessible without implying an automatic payment confirmation", () => {
    const donationModal = readProjectFile("client/src/components/DonationModal.tsx");
    expect(donationModal).toContain('role="dialog"');
    expect(donationModal).toContain('event.key === \'Escape\'');
    expect(donationModal).toContain("احتفظ بإيصال التحويل");
    expect(donationModal).not.toContain("سيتم تأكيد تبرعك فوراً");
    expect(donationModal).toContain('aria-live="polite"');
  });

  it("splits major production dependencies into cacheable chunks", () => {
    const viteConfig = readProjectFile("vite.config.ts");
    expect(viteConfig).toContain("manualChunks");
    expect(viteConfig).toContain("firebase-vendor");
    expect(viteConfig).toContain("react-vendor");
    expect(viteConfig).toContain("ui-vendor");
    expect(viteConfig).toContain("data-vendor");
  });

  it("honours the user preference to reduce motion across public screens", () => {
    const styles = readProjectFile("client/src/index.css");
    expect(styles).toContain("prefers-reduced-motion: reduce");
    expect(styles).toContain("animation-duration: 0.01ms !important");
    expect(styles).toContain("scroll-behavior: auto");
  });

  it("uses route-specific public metadata while preventing search indexing of administration routes", () => {
    const app = readProjectFile("client/src/App.tsx");
    expect(app).toContain("routeMetadata");
    expect(app).toContain("International Partner Brief");
    expect(app).toContain("noindex, nofollow");
    expect(app).toContain("/admin-dashboard");
    expect(app).toContain('rel = "canonical"');
  });

  it("keeps partnership and volunteer forms accessible during submission and recoverable after an error", () => {
    const forms = readProjectFile("client/src/components/InterestForms.tsx");
    expect(forms).toContain('aria-busy={status === "sending"}');
    expect(forms).toContain('aria-disabled={status === "sending"}');
    expect(forms).toContain("const updateConsent");
    expect(forms).toContain('setStatus("idle")');
  });

  it("offers a safe retry path when public Firestore data cannot be loaded", () => {
    const projects = readProjectFile("client/src/pages/Projects.tsx");
    const media = readProjectFile("client/src/pages/MediaLibrary.tsx");
    const transparency = readProjectFile("client/src/pages/Transparency.tsx");
    expect(projects).toContain("loadAttempt");
    expect(media).toContain("loadAttempt");
    expect(transparency).toContain("retryLoad");
    expect(projects).toContain("إعادة المحاولة");
    expect(media).toContain("إعادة المحاولة");
    expect(transparency).toContain("إعادة المحاولة");
  });

  it("shows an Arabic recovery screen without exposing technical error details", () => {
    const errorBoundary = readProjectFile("client/src/components/ErrorBoundary.tsx");
    expect(errorBoundary).toContain("تعذر عرض هذه الصفحة الآن");
    expect(errorBoundary).toContain("محاولة مرة أخرى");
    expect(errorBoundary).toContain("إعادة تحميل الصفحة");
    expect(errorBoundary).not.toContain("error?.stack");
  });

  it("provides page-specific metadata for shared public links", () => {
    const app = readProjectFile("client/src/App.tsx");
    expect(app).toContain('setPropertyMeta("og:title"');
    expect(app).toContain('setPropertyMeta("og:description"');
    expect(app).toContain('setNamedMeta("twitter:card"');
    expect(app).toContain('setPropertyMeta("og:url"');
  });

  it("uses the active published domain in static discovery metadata until the official domain is connected", () => {
    const indexHtml = readProjectFile("client/index.html");
    expect(indexHtml).toContain("https://mashrouana-ne8hfedf.manus.space/");
    expect(indexHtml).not.toContain("https://mashroana.org/");
  });

  it("offers Arabic recovery links on a missing route", () => {
    const notFound = readProjectFile("client/src/pages/NotFound.tsx");
    expect(notFound).toContain("الصفحة غير متاحة");
    expect(notFound).toContain("العودة للرئيسية");
    expect(notFound).toContain("المشاريع والبرامج");
    expect(notFound).toContain("تواصل معنا");
  });

  it("publishes an honest Arabic accessibility statement and makes it discoverable", () => {
    const accessibility = readProjectFile("client/src/pages/Accessibility.tsx");
    const app = readProjectFile("client/src/App.tsx");
    const footer = readProjectFile("client/src/components/Footer.tsx");
    expect(accessibility).toContain("بيان الإتاحة الرقمية");
    expect(accessibility).toContain("لا ندّعي توافقاً قانونياً أو تقنياً");
    expect(app).toContain('"/accessibility"');
    expect(footer).toContain("بيان الإتاحة");
  });
});
