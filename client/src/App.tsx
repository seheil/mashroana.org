import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Gallery from "./pages/Gallery";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { SadaqahAdvisor } from "./components/SadaqahAdvisor";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import AdminPanel from "./pages/AdminPanel";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/about"} component={About} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/privacy"} component={Privacy} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/admin-login"} component={AdminLogin} />
          <Route path={"/admin-dashboard"} component={AdminDashboard} />
          <Route path={"/admin"} component={Admin} />
          <Route path={"/admin-panel"} component={AdminPanel} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
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
