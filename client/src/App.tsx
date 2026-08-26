import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
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

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only fixed right-4 top-4 z-[100] rounded-lg bg-emerald-800 px-4 py-3 font-bold text-white shadow-lg focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-amber-300"
      >
        تجاوز إلى المحتوى الرئيسي
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <Suspense fallback={<div className="px-4 py-20 text-center text-slate-600" role="status">جاري تحميل الصفحة...</div>}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/about"} component={About} />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/privacy"} component={Privacy} />
            <Route path={"/gallery"} component={MediaLibrary} />
            <Route path={"/projects"} component={Projects} />
            <Route path={"/achievements"} component={Achievements} />
            <Route path={"/media"} component={MediaLibrary} />
            <Route path={"/transparency"} component={Transparency} />
            <Route path={"/partnerships"} component={Partnerships} />
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
