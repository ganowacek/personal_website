import { BookOpen, GraduationCap, Mail, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CommandPaletteProps = {
  onNavigate: (target: string) => void;
};

export function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands = [
    { label: "Education", target: "#education", icon: GraduationCap },
    { label: "Teaching", target: "#teaching", icon: GraduationCap },
    { label: "Research", target: "#research", icon: Search },
    { label: "Publication", target: "#publications", icon: Search },
    { label: "Coursework", target: "#coursework", icon: BookOpen },
    { label: "Skills", target: "#skills", icon: Search },
    { label: "Fellowships", target: "#fellowships", icon: GraduationCap },
    { label: "Experience", target: "#experience", icon: Search },
    { label: "Contact", target: "#contact", icon: Mail },
  ];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => command.label.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function select(target: string) {
    setOpen(false);
    setQuery("");
    onNavigate(target);
  }

  return (
    <>
      <button
        className="icon-button"
        type="button"
        aria-label="Open quick navigation"
        title="Quick navigation"
        onClick={() => setOpen(true)}
      >
        <Search aria-hidden="true" size={18} />
      </button>

      {open ? (
        <div className="palette-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div className="palette" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-search">
              <Search aria-hidden="true" size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections"
                aria-label="Search site sections"
              />
              <button type="button" aria-label="Close quick navigation" onClick={() => setOpen(false)}>
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <div className="palette-results">
              {filtered.map((command) => {
                const Icon = command.icon;
                return (
                  <button
                    type="button"
                    key={command.label}
                    className="palette-item"
                    onClick={() => select(command.target)}
                  >
                    <Icon aria-hidden="true" size={17} />
                    <span>{command.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
