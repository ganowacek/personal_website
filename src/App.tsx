import { useEffect, useMemo, useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";

const basePath = import.meta.env.BASE_URL;

function normalizePath(pathname: string) {
  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}

function routeFromLocation(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedBase = normalizePath(basePath);

  if (normalizedBase !== "/" && normalizedPath.startsWith(normalizedBase)) {
    const withoutBase = normalizedPath.slice(normalizedBase.length);
    return withoutBase ? normalizePath(`/${withoutBase.replace(/^\/+/, "")}`) : "/";
  }

  return normalizedPath || "/";
}

function appUrl(target: string) {
  if (target === "/") return basePath;
  if (target.startsWith("#")) return `${basePath}${target}`;
  if (target.startsWith("/")) return `${basePath}${target.replace(/^\/+/, "")}`;
  return target;
}

function navigateTo(target: string) {
  if (target.startsWith("http")) {
    window.open(target, "_blank", "noopener,noreferrer");
    return;
  }

  if (target.startsWith("#")) {
    window.history.pushState(null, "", appUrl(target));
    window.dispatchEvent(new PopStateEvent("popstate"));
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return;
  }

  window.history.pushState(null, "", appUrl(target));
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function App() {
  const [path, setPath] = useState(() => routeFromLocation(window.location.pathname));

  useEffect(() => {
    function onPopState() {
      setPath(routeFromLocation(window.location.pathname));
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
    return <NotFound />;
  }, [path]);

  return <Layout onNavigate={navigateTo}>{page}</Layout>;
}
