import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, FloatingControls, Header } from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import { ArticlePage, ArticlesPage, NotFound, PolicyPage, ServicePage, ServicesPage } from "./pages/pages.jsx";
import { applyMeta, getMeta } from "./lib/seo.js";

/** Updates page metadata and scroll position on every navigation. */
function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => applyMeta(getMeta(pathname)), [pathname]);
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return undefined;
    }
    const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <RouteEffects />
    <Header />
    <main id="main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/treatments/:slug" element={<ServicePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/disclaimer" element={<PolicyPage disclaimer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <FloatingControls />
  </>;
}
