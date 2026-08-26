import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { SadaqahAdvisor } from "./components/SadaqahAdvisor";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const Achievements = lazy(() => import("./pages/Achievements"));
const MediaLibrary = lazy(() => import("./pages/MediaLibrary"));
const Transparency = lazy(() => import("./pages/Transparency"));
const Partnerships = lazy(() => import("./pages/Partnerships"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const ImpactMethodology = lazy(() => import("./pages/ImpactMethodology"));
const InternationalBrief = lazy(() => import("./pages/InternationalBrief"));
const MediaKit = lazy(() => import("./pages/MediaKit"));
const PartnerBriefArabic = lazy(() => import("./pages/PartnerBriefArabic"));
const Accessibility = lazy(() => import("./pages/Accessibility"));

const routeMetadata: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/": { title: "مؤسسة مشروعنا إلى الجنة للأعمال الخيرية", description: "منصة مؤسسة مشروعنا إلى الجنة للأعمال الخيرية للتعريف بالبرامج والشراكات وقنوات التبرع الرسمية." },
  "/about": { title: "عن المؤسسة | مؤسسة مشروعنا إلى الجنة", description: "تعرف على رسالة المؤسسة ومجالات عملها ونهجها في خدمة المجتمع." },
  "/projects": { title: "المشاريع والبرامج | مؤسسة مشروعنا إلى الجنة", description: "اطلع على البرامج التي تعتمد المؤسسة نشرها ومتابعة تطورها." },
  "/achievements": { title: "إنجازاتنا | مؤسسة مشروعنا إلى الجنة", description: "تعرف على الإنجازات المنشورة من المؤسسة في إطار معلومات قابلة للمراجعة." },
  "/media": { title: "مكتبة الأثر المرئي | مؤسسة مشروعنا إلى الجنة", description: "صور وفيديوهات منشورة من أعمال المؤسسة مع احترام الحقوق وخصوصية المستفيدين." },
  "/gallery": { title: "مكتبة الأثر المرئي | مؤسسة مشروعنا إلى الجنة", description: "صور وفيديوهات منشورة من أعمال المؤسسة مع احترام الحقوق وخصوصية المستفيدين." },
  "/media-kit": { title: "الحزمة الإعلامية | مؤسسة مشروعنا إلى الجنة", description: "إطار استخدام الاسم والهوية والمواد الإعلامية المعتمدة للمؤسسة." },
  "/transparency": { title: "الشفافية والحوكمة | مؤسسة مشروعنا إلى الجنة", description: "مركز الوثائق والسياسات ومعلومات الحوكمة التي تعتمد المؤسسة مشاركتها." },
  "/impact-methodology": { title: "منهجية قياس الأثر | مؤسسة مشروعنا إلى الجنة", description: "منهجية المؤسسة لنشر بيانات الأثر بسياق ومصدر وفترة تحقق." },
  "/partnerships": { title: "الشراكات والمنح | مؤسسة مشروعنا إلى الجنة", description: "ابدأ حوار شراكة منظم مع المؤسسة حول البرامج والاحتياجات ومعلومات العناية الواجبة." },
  "/partner-brief": { title: "موجز الشراكة | مؤسسة مشروعنا إلى الجنة", description: "موجز عربي يوضح نطاق التعاون وخطوات التقييم والعناية الواجبة." },
  "/international-brief": { title: "International Partner Brief | Mashroana Foundation", description: "An English introduction to collaboration, due diligence and responsible partnership with Mashroana Foundation." },
  "/volunteer": { title: "التطوع | مؤسسة مشروعنا إلى الجنة", description: "سجل اهتمامك بالتطوع وفق سياسة فرز وتواصل واضحة من المؤسسة." },
  "/contact": { title: "تواصل معنا | مؤسسة مشروعنا إلى الجنة", description: "تواصل مع مؤسسة مشروعنا إلى الجنة عبر القنوات الرسمية أو نموذج الرسائل." },
  "/privacy": { title: "سياسة الخصوصية | مؤسسة مشروعنا إلى الجنة", description: "تعرف على طريقة تعامل الموقع مع بيانات نماذج التواصل والشراكة والتطوع." },
  "/accessibility": { title: "بيان الإتاحة الرقمية | مؤسسة مشروعنا إلى الجنة", description: "تعرف على ممارسات الإتاحة الحالية وطرق طلب المساعدة البديلة من المؤسسة." },
  "/admin-login": { title: "دخول الإدارة", description: "بوابة دخول الإدارة.", noindex: true },
  "/admin-dashboard": { title: "لوحة الإدارة", description: "لوحة الإدارة.", noindex: true },
  "/admin": { title: "لوحة الإدارة", description: "لوحة الإدارة.", noindex: true },
  "/admin-panel": { title: "لوحة الإدارة", description: "لوحة الإدارة.", noindex: true },
};

function RouteMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const metadata = routeMetadata[location] ?? { title: "الصفحة غير موجودة | مؤسسة مشروعنا إلى الجنة", description: "الصفحة المطلوبة غير متاحة.", noindex: true };
    document.title = metadata.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]') ?? document.head.appendChild(document.createElement("meta"));
    description.name = "description";
    description.content = metadata.description;

    const setPropertyMeta = (property: string, content: string) => {
      const meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`) ?? document.head.appendChild(document.createElement("meta"));
      meta.setAttribute("property", property);
      meta.content = content;
    };

    const setNamedMeta = (name: string, content: string) => {
      const meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`) ?? document.head.appendChild(document.createElement("meta"));
      meta.name = name;
      meta.content = content;
    };

    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.head.appendChild(document.createElement("meta"));
    robots.name = "robots";
    robots.content = metadata.noindex ? "noindex, nofollow" : "index, follow";

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.head.appendChild(document.createElement("link"));
    canonical.rel = "canonical";
    canonical.href = `${window.location.origin}${location === "/" ? "/" : location}`;

    setPropertyMeta("og:title", metadata.title);
    setPropertyMeta("og:description", metadata.description);
    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:url", canonical.href);
    setNamedMeta("twitter:card", "summary");
    setNamedMeta("twitter:title", metadata.title);
    setNamedMeta("twitter:description", metadata.description);
  }, [location]);

  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <RouteMetadata />
      <a
        href="#main-content"
        className="sr-only fixed right-4 top-4 z-[100] rounded-lg bg-emerald-800 px-4 py-3 font-bold text-white shadow-lg focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-amber-300"
      >
        تجاوز إلى المحتوى الرئيسي
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none" aria-label="المحتوى الرئيسي">
        <Suspense fallback={<div className="px-4 py-20 text-center text-slate-600" role="status">جاري تحميل الصفحة...</div>}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/about"} component={About} />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/privacy"} component={Privacy} />
            <Route path={"/accessibility"} component={Accessibility} />
            <Route path={"/gallery"} component={MediaLibrary} />
            <Route path={"/projects"} component={Projects} />
            <Route path={"/achievements"} component={Achievements} />
            <Route path={"/media"} component={MediaLibrary} />
            <Route path={"/media-kit"} component={MediaKit} />
            <Route path={"/transparency"} component={Transparency} />
            <Route path={"/impact-methodology"} component={ImpactMethodology} />
            <Route path={"/international-brief"} component={InternationalBrief} />
            <Route path={"/partnerships"} component={Partnerships} />
            <Route path={"/partner-brief"} component={PartnerBriefArabic} />
            <Route path={"/volunteer"} component={Volunteer} />
            <Route path={"/admin-login"} component={AdminLogin} />
            <Route path={"/admin-dashboard"} component={AdminDashboard} />
            <Route path={"/admin"} component={AdminDashboard} />
            <Route path={"/admin-panel"} component={AdminDashboard} />
            <Route path={"/404"} component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <SadaqahAdvisor />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
