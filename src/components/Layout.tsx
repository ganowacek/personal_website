import { ExternalLink, FileText, Mail, Moon, Network, Sun } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { siteConfig, withBasePath } from "../data/site";
import { CommandPalette } from "./CommandPalette";
import { SiteBackground } from "./SiteBackground";

type LayoutProps = {
  children: ReactNode;
  onNavigate: (target: string) => void;
};

export function Layout({ children, onNavigate }: LayoutProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const nav = [
    ["About", "#about"],
    ["Research", "#research"],
    ["Teaching", "#teaching"],
    ["Coursework", "#coursework"],
    ["Experience", "#experience"],
    ["Now", "/now"],
  ];

  return (
    <>
      <SiteBackground dark={dark} />
      <header className="site-nav">
        <a className="wordmark" href={withBasePath("")} onClick={(event) => {
          event.preventDefault();
          onNavigate("/");
        }}>
          {siteConfig.shortName}
        </a>
        <nav aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a key={label} href={href.startsWith("/") ? withBasePath(href) : href} onClick={(event) => {
              event.preventDefault();
              onNavigate(href);
            }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <CommandPalette onNavigate={onNavigate} />
          <button className="icon-button" type="button" aria-label="Toggle dark mode" title="Toggle dark mode" onClick={() => setDark((value) => !value)}>
            {dark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
          </button>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>© {new Date().getFullYear()} {siteConfig.shortName}. Built with React · Hosted on GitHub.</p>
        </div>
        <div className="footer-links">
          {siteConfig.linkedin ? <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Network size={18} /></a> : null}
          {siteConfig.github ? <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ExternalLink size={18} /></a> : null}
          {siteConfig.email ? <a href={`mailto:${siteConfig.email}`} aria-label="Email"><Mail size={18} /></a> : null}
          {siteConfig.cvAvailable ? <a href={siteConfig.cv} download="George_Nowacek_CV.pdf" aria-label="Download CV"><FileText size={18} /></a> : null}
        </div>
      </footer>
    </>
  );
}
