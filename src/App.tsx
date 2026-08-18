import { useEffect, useMemo, useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { NowPage } from "./pages/NowPage";

function normalizePath(pathname: string) {
  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}

function navigateTo(target: string) {
  if (target.startsWith("http")) {
    window.open(target, "_blank", "noopener,noreferrer");
    return;
  }

  if (target.startsWith("#")) {
    if (normalizePath(window.location.pathname) !== "/") {
      window.history.pushState(null, "", `/${target}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return;
  }

  window.history.pushState(null, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    function onPopState() {
      setPath(normalizePath(window.location.pathname));
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && path === "/") {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ block: "start" }), 0);
    }
  }, [path]);

  const page = useMemo(() => {
    if (path === "" || path === "/") return <HomePage onNavigate={navigateTo} />;
    if (path === "/now") return <NowPage />;
    return <NotFound />;
  }, [path]);

  return <Layout onNavigate={navigateTo}>{page}</Layout>;
}
