import {
  ArrowRight,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Microscope,
  Network,
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { certifications } from "../data/certifications";
import { coursework } from "../data/coursework";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { fellowships } from "../data/fellowships";
import { publications } from "../data/publications";
import { researchEntries } from "../data/research";
import { selectedTools, siteConfig } from "../data/site";
import { teaching } from "../data/teaching";

type HomePageProps = {
  onNavigate: (target: string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  const honors = education.flatMap((item) => item.honors ?? []);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Statistics · Research · Pure Mathematics</p>
          <h1>{siteConfig.name}</h1>
          <p className="hero-lede">
            I am pursuing an M.S. in Statistical Science at Duke University after studying
            Mathematics with a minor in Statistics and Analytics at UNC-Chapel Hill.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => onNavigate("#education")}>
              View Credentials <ArrowRight aria-hidden="true" size={17} />
            </button>
            <a
              className="button secondary"
              href={siteConfig.cv}
              download="George_Nowacek_CV.pdf"
              aria-disabled={!siteConfig.cvAvailable}
              title="Download CV"
            >
              Download CV <Download aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="social-row" aria-label="Professional links">
            {siteConfig.linkedin ? <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Network size={18} />LinkedIn</a> : null}
            {siteConfig.github ? <a href={siteConfig.github} target="_blank" rel="noreferrer"><ExternalLink size={18} />GitHub</a> : null}
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={18} />Email</a> : null}
          </div>
        </div>
        <figure className="hero-portrait">
          <img src={siteConfig.headshot} alt="Professional headshot of me, George A. Nowacek II" />
        </figure>
      </section>

      <section className="section credential-section" id="education">
        <SectionHeader eyebrow="Education" title="Education" />
        <div className="credential-grid">
          <div className="stack">
            {education.map((item) => (
              <article className="credential-card" key={item.institution}>
                <p className="meta">{item.dates}</p>
                <h3>{item.institution}</h3>
                <p>{item.degree}</p>
              </article>
            ))}
          </div>
          {honors.length ? (
            <aside className="credential-card honors-card">
              <p className="eyebrow">Honors</p>
              <ul>
                {honors.map((honor) => <li key={honor}>{honor}</li>)}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>

      <section className="section teaching-section" id="teaching">
        <SectionHeader eyebrow="Teaching Experience" title="Teaching Experience" />
        <div className="teaching-list">
          {teaching.map((item) => (
            <article key={`${item.institution}-${item.role}`}>
              <div className="teaching-icon"><GraduationCap size={19} /></div>
              <div>
                <p className="meta">{[item.institution, item.term].filter(Boolean).join(" · ")}</p>
                <h3>{item.role}</h3>
                {item.course ? <p className="meta">{item.course}</p> : null}
                <p>{item.description}</p>
                <div className="tag-row compact">{item.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="research">
        <SectionHeader eyebrow="Research Experience" title="Research Appointments" />
        <div className="research-grid">
          {researchEntries.map((entry) => (
            <article className="research-card" key={entry.title}>
              <div className="card-kicker"><Microscope size={16} />{entry.institution}</div>
              <h3>{entry.title}</h3>
              {entry.group || entry.dates ? <p className="meta">{[entry.group, entry.dates].filter(Boolean).join(" · ")}</p> : null}
              <p>{entry.description}</p>
              <div className="tag-row">
                {entry.methods.slice(0, 6).map((method) => <span key={method}>{method}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section publication-band" id="publications">
        <SectionHeader eyebrow="Publication" title="Publication" />
        <div className="stack">
          {publications.map((publication) => (
            <article className="publication" key={publication.title}>
              <span>{publication.status}</span>
              <h3>{publication.title}</h3>
              <p>{publication.citation}</p>
              {publication.doi ? (
                <div className="inline-links">
                  <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">
                    DOI <ExternalLink size={15} />
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section coursework-section" id="coursework">
        <SectionHeader eyebrow="Relevant Coursework" title="Relevant Coursework" />
        <ul className="course-list coursework-board" aria-label="Coursework">
          {coursework.map((course) => <li key={course}>{course}</li>)}
        </ul>
      </section>

      <section className="section skills-section" id="skills">
        <div className="skills-grid">
          <div>
            <SectionHeader eyebrow="Technical Skills" title="Technical Skills" />
            <div className="tag-row skills-tags">{selectedTools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
          <div className="certification-panel" id="certifications">
            <p className="eyebrow">Certifications</p>
            <div className="certification-list">
              {certifications.map((certification) => (
                <article key={certification.name}>
                  <h3>{certification.name}</h3>
                  <p className="meta">{[certification.issuer, certification.dates].filter(Boolean).join(" · ")}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section fellowship-section" id="fellowships">
        <SectionHeader eyebrow="Fellowships" title="Fellowships" />
        <div className="stack">
          {fellowships.map((fellowship) => (
            <article className="credential-card" key={fellowship.name}>
              <p className="meta">{[fellowship.organization, fellowship.dates].filter(Boolean).join(" · ")}</p>
              <h3>{fellowship.name}</h3>
              <p>{fellowship.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
        <SectionHeader eyebrow="Professional Experience" title="Professional Experience" />
        <div className="timeline">
          {experience.map((item) => (
            <article key={`${item.organization}-${item.title}`}>
              <span>{item.dates}</span>
              <h3>{item.title}</h3>
              <p className="meta">{item.organization}</p>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-panel">
          <p className="eyebrow">Contact</p>
          <h2>Let's connect.</h2>
          <p>I can be reached by email, LinkedIn, or GitHub.</p>
          <div className="contact-links">
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={17} />Email</a> : null}
            {siteConfig.linkedin ? <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Network size={17} />LinkedIn</a> : null}
            {siteConfig.github ? <a href={siteConfig.github} target="_blank" rel="noreferrer"><ExternalLink size={17} />GitHub</a> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
