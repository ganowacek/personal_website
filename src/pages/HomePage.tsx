import {
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  Microscope,
  MoveUpRight,
  Code2,
  Network,
} from "lucide-react";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { publications } from "../data/publications";
import { researchProjects } from "../data/research";
import { currentFocus, researchInterests, selectedTools, siteConfig } from "../data/site";
import { teaching } from "../data/teaching";
import { downloadCv, openCv } from "../lib/cv";
import { SectionHeader } from "../components/SectionHeader";

type HomePageProps = {
  onNavigate: (target: string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Statistics · Research · Pure Mathematics</p>
          <h1>{siteConfig.name}</h1>
          <p className="hero-lede">
            I apply quantitative methods, computation, and pure mathematics to meaningful problems in
            medicine and public health.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => onNavigate("#research")}>
              View My Work <ArrowRight aria-hidden="true" size={17} />
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={downloadCv}
              disabled={!siteConfig.cvAvailable}
              title={siteConfig.cvAvailable ? "Download CV" : "Add CV PDF and set cvAvailable to true"}
            >
              Download CV <Download aria-hidden="true" size={17} />
            </button>
          </div>
          <div className="social-row" aria-label="Professional links">
            {siteConfig.github ? <a href={siteConfig.github} target="_blank" rel="noreferrer"><Code2 size={18} />GitHub</a> : <span><Code2 size={18} />I'll add my GitHub link</span>}
            {siteConfig.linkedin ? <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Network size={18} />LinkedIn</a> : <span><Network size={18} />I'll add my LinkedIn link</span>}
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={18} />Email</a> : <span><Mail size={18} />I'll add my email</span>}
          </div>
        </div>
        <aside className="hero-panel" aria-label="Current focus">
          <div className="stat-visual" aria-hidden="true">
            <span style={{ height: "36%" }} />
            <span style={{ height: "62%" }} />
            <span style={{ height: "48%" }} />
            <span style={{ height: "78%" }} />
            <span style={{ height: "55%" }} />
          </div>
          <h2>Currently</h2>
          <ul>
            {currentFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section about-grid" id="about">
        <div>
          <SectionHeader eyebrow="About" title="Quantitative work, grounded in real questions.">
            I am a graduate student in Statistics at Duke University with an undergraduate
            background in Mathematics from UNC-Chapel Hill.
          </SectionHeader>
          <p>
            I work across academic research, statistical computing, and teaching, with interests
            spanning public health, medical research, epidemiology, pure mathematics, and quantitative
            methodology.
          </p>
          <div className="tag-row compact">
            {researchInterests.map((interest) => <span key={interest}>{interest}</span>)}
          </div>
        </div>
        <figure className="headshot-card">
          <img src={siteConfig.headshot} alt="Professional headshot of me, George A Nowacek II" loading="lazy" />
          <figcaption>George A Nowacek II</figcaption>
        </figure>
      </section>

      <section className="section" id="research">
        <SectionHeader eyebrow="Research" title="Maternal health, epidemiology, and reproducible statistics.">
          I keep selected research areas and data projects structured so I can add publications,
          posters, code, and datasets as they become public.
        </SectionHeader>
        <div className="research-grid">
          {researchProjects.map((project) => (
            <article className="research-card" key={project.title}>
              <div className="card-kicker"><Microscope size={16} />{project.institution}</div>
              <h3>{project.title}</h3>
              {project.group ? <p className="meta">{project.group}{project.dates ? ` · ${project.dates}` : ""}</p> : null}
              <p>{project.description}</p>
              <div className="tag-row">
                {project.methods.slice(0, 6).map((method) => <span key={method}>{method}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section publication-band">
        <SectionHeader eyebrow="Publications" title="A publication list ready for real records.">
          I will add DOI, PubMed, PDF, manuscript, citation, and conference information here as
          my publication record develops.
        </SectionHeader>
        {publications.length ? (
          <div className="stack">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <span>{publication.status}</span>
                <h3>{publication.title}</h3>
                <p>{publication.authors}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen aria-hidden="true" size={24} />
            <p>I will add manuscripts, conference presentations, and papers here as they are ready.</p>
          </div>
        )}
      </section>

      <section className="section" id="projects">
        <SectionHeader eyebrow="Projects" title="Technical projects with my sense of traceability.">
          I use this space for statistical computing, visualization, R/Python work, web projects,
          and research tools.
        </SectionHeader>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={project.featured ? "project-card featured" : "project-card"} key={project.title}>
              <p className="meta">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              <div className="project-links">
                {project.github ? <a href={project.github}>Repository <MoveUpRight size={15} /></a> : <span>I'll add the repository link</span>}
                {project.demo ? <a href={project.demo}>Demo <MoveUpRight size={15} /></a> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section teaching-section" id="teaching">
        <SectionHeader eyebrow="Teaching" title="Clear explanations, reproducible analysis, and practical computation.">
          I teach and support work across statistics, R, visualization, academic leadership, and
          interdisciplinary education.
        </SectionHeader>
        <div className="teaching-list">
          {teaching.map((item) => (
            <article key={`${item.institution}-${item.role}`}>
              <div className="teaching-icon"><GraduationCap size={19} /></div>
              <div>
                <p className="meta">{item.institution}</p>
                <h3>{item.role}</h3>
                <p>{item.description}</p>
                <div className="tag-row compact">{item.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="experience">
        <div>
          <SectionHeader eyebrow="Experience" title="A focused timeline rather than a full CV clone.">
            I highlight selected research, teaching, employment, leadership, and education entries
            here, with my full CV carrying the rest.
          </SectionHeader>
          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.organization}-${item.title}`}>
                <span>{item.type}</span>
                <h3>{item.title}</h3>
                <p className="meta">{item.organization}{item.dates ? ` · ${item.dates}` : ""}</p>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="education-panel">
          <p className="eyebrow">Education</p>
          {education.map((item) => (
            <article key={item.institution}>
              <h3>{item.institution}</h3>
              <p>{item.degree}</p>
              {item.coursework?.length ? <small>{item.coursework.join(" · ")}</small> : null}
            </article>
          ))}
          <div className="tools">
            <p className="eyebrow">Selected Tools</p>
            <div className="tag-row compact">{selectedTools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
        </aside>
      </section>

      <section className="section cv-contact" id="cv">
        <div className="cv-panel">
          <FileText aria-hidden="true" size={28} />
          <h2>CV</h2>
          <p>
            My current CV is available as a PDF. You can open it in a new tab or download a copy.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={openCv} disabled={!siteConfig.cvAvailable}>View CV <ExternalLink size={16} /></button>
            <button className="button secondary" type="button" onClick={downloadCv} disabled={!siteConfig.cvAvailable}>Download CV <Download size={16} /></button>
          </div>
        </div>
        <div className="contact-panel" id="contact">
          <p className="eyebrow">Contact</p>
          <h2>Let's connect.</h2>
          <p>
            I am open to research collaboration, statistical consulting, teaching conversations,
            and professional opportunities in health research, statistics, and pure mathematics.
          </p>
          <div className="contact-links">
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={17} />Email</a> : <span><Mail size={17} />I'll add my email</span>}
            {siteConfig.linkedin ? <a href={siteConfig.linkedin}><Network size={17} />LinkedIn</a> : <span><Network size={17} />I'll add my LinkedIn link</span>}
            {siteConfig.github ? <a href={siteConfig.github}><Code2 size={17} />GitHub</a> : <span><Code2 size={17} />I'll add my GitHub link</span>}
          </div>
        </div>
      </section>
    </main>
  );
}
