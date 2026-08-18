import {
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  Microscope,
  Network,
} from "lucide-react";
import { ManimCanvas } from "../components/ManimCanvas";
import { SectionHeader } from "../components/SectionHeader";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { publications } from "../data/publications";
import { researchEntries } from "../data/research";
import { currentFocus, researchInterests, selectedTools, siteConfig } from "../data/site";
import { teaching } from "../data/teaching";
import { downloadCv } from "../lib/cv";

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
            I am pursuing an M.S. in Statistical Science at Duke University after studying
            Mathematics with a minor in Statistics and Analytics at UNC-Chapel Hill.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => onNavigate("#research")}>
              View My Work <ArrowRight aria-hidden="true" size={17} />
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => onNavigate("#cv")}
              disabled={!siteConfig.cvAvailable}
              title="View CV"
            >
              View CV <FileText aria-hidden="true" size={17} />
            </button>
          </div>
          <div className="social-row" aria-label="Professional links">
            {siteConfig.linkedin ? <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><Network size={18} />LinkedIn</a> : null}
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={18} />Email</a> : null}
          </div>
          <figure className="hero-diagram">
            <img
              src={siteConfig.diagram}
              alt="Diagram-style title card for George A Nowacek II with statistical graphics"
            />
          </figure>
        </div>
        <aside className="hero-panel manim-panel" aria-label="Current focus">
          <ManimCanvas />
          <div className="manim-caption">
            <p className="eyebrow">Now</p>
            <h2>Currently</h2>
            <ul>
              {currentFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="section about-grid" id="about">
        <div>
          <SectionHeader eyebrow="About" title="Quantitative work, grounded in my CV.">
            My CV brings together statistical science, mathematics, global health data science,
            medical humanities, research, teaching, and professional experience.
          </SectionHeader>
          <p>
            I have supported global maternal and perinatal health research at the UNC School of
            Medicine, led coding lab sections in R, and worked across data documentation, literature
            review, teaching, and operations.
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
        <SectionHeader eyebrow="Research" title="Maternal health, medical imaging, and reproducible documentation.">
          My research experience includes global maternal and perinatal health, medical imaging,
          machine learning, systematic screening, clinical study coordination, and literature review.
        </SectionHeader>
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

      <section className="section publication-band">
        <SectionHeader eyebrow="Publications" title="Published work listed on my CV.">
          I list publication records here only when they appear on my CV.
        </SectionHeader>
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

      <section className="section teaching-section" id="teaching">
        <SectionHeader eyebrow="Teaching" title="Teaching roles listed on my CV.">
          My CV lists teaching roles at Duke University and UNC-Chapel Hill.
        </SectionHeader>
        <div className="teaching-list">
          {teaching.map((item) => (
            <article key={`${item.institution}-${item.role}`}>
              <div className="teaching-icon"><GraduationCap size={19} /></div>
              <div>
                <p className="meta">{item.institution}</p>
                <h3>{item.role}</h3>
                {item.course || item.term ? <p className="meta">{[item.course, item.term].filter(Boolean).join(" · ")}</p> : null}
                <p>{item.description}</p>
                <div className="tag-row compact">{item.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section coursework-section" id="coursework">
        <SectionHeader eyebrow="Coursework" title="The classes shaping my quantitative toolkit.">
          I use coursework as a useful map of the mathematical, statistical, computational, and
          scientific training listed on my CV.
        </SectionHeader>
        <div className="coursework-grid">
          {education.filter((item) => item.coursework?.length).map((item) => (
            <article className="coursework-card" key={`${item.institution}-coursework`}>
              <div className="card-kicker"><BookOpen size={16} />{item.institution}</div>
              <h3>{item.degree}</h3>
              {item.dates ? <p className="meta">{item.dates}</p> : null}
              <ul className="course-list">
                {item.coursework?.map((course) => <li key={course}>{course}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="experience">
        <div>
          <SectionHeader eyebrow="Experience" title="A focused timeline from my CV.">
            I highlight selected research, teaching, fellowship, employment, and education entries
            that appear on my CV.
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
              {item.dates ? <small>{item.dates}</small> : null}
              {item.honors?.length ? <small>{item.honors.join(" · ")}</small> : null}
            </article>
          ))}
          <div className="tools">
            <p className="eyebrow">Technical Skills</p>
            <div className="tag-row compact">{selectedTools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
        </aside>
      </section>

      <section className="section cv-contact" id="cv">
        <div className="cv-panel">
          <div className="cv-header">
            <div>
              <FileText aria-hidden="true" size={28} />
              <p className="eyebrow">CV</p>
              <h2>Curriculum Vitae</h2>
              <p>
                I keep my current CV visible here, with a download available for reference.
              </p>
            </div>
            <button className="button secondary" type="button" onClick={downloadCv} disabled={!siteConfig.cvAvailable}>
              Download CV <Download size={16} />
            </button>
          </div>
          {siteConfig.cvAvailable ? (
            <iframe
              className="cv-frame"
              src={`${siteConfig.cv}#view=FitH`}
              title="George A Nowacek II CV"
            />
          ) : null}
        </div>
        <div className="contact-panel" id="contact">
          <p className="eyebrow">Contact</p>
          <h2>Let's connect.</h2>
          <p>My CV lists email and LinkedIn as my contact points.</p>
          <div className="contact-links">
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={17} />Email</a> : null}
            {siteConfig.linkedin ? <a href={siteConfig.linkedin}><Network size={17} />LinkedIn</a> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
