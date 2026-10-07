import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageFallback from "./components/PageFallback";
import Home from "./pages/Home";

/**
 * Home stays in the main bundle — it is the landing route and needs the
 * WebGL scene immediately. Everything else is split out, so a visitor who
 * only looks at the island never downloads the contact form, emailjs, or
 * the projects data.
 */
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

/**
 * Warm the split chunks once the browser is idle, so navigation feels
 * instant. Skipped entirely on Data Saver or a 2G/3G connection — nobody on
 * a metered phone plan should pay for pages they may never open.
 */
const prefetchRoutes = () => {
  const net = navigator.connection;
  if (net?.saveData) return;
  if (net?.effectiveType && /2g|3g/.test(net.effectiveType)) return;

  import("./pages/Projects");
  import("./pages/About");
  import("./pages/Contact");
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Shell = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <ScrollToTop />
      {/* Inner pages open under the same sky as the island. */}
      {!isHome && <div className="sky-band" aria-hidden="true" />}
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<About />} />
        </Routes>
      </Suspense>
      {!isHome && <Footer />}
    </>
  );
};

const App = () => {
  useEffect(() => {
    const idle =
      window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
    const id = idle(prefetchRoutes);
    return () => window.cancelIdleCallback?.(id);
  }, []);

  return (
    <main className="relative bg-paper min-h-screen">
      <Router>
        <Shell />
      </Router>
    </main>
  );
};

export default App;
