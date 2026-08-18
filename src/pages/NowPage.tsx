import { nowContent, siteConfig } from "../data/site";

export function NowPage() {
  const sections = [
    ["Studying", nowContent.studying],
    ["Research", nowContent.research],
    ["Building", nowContent.building],
    ["Reading", nowContent.reading],
  ];

  return (
    <main className="now-page">
      <section className="page-hero">
        <a className="back-link" href="/">Back to home</a>
        <p className="eyebrow">Now</p>
        <h1>What I am focused on now.</h1>
        <p>
          I use this page as a small, current snapshot of study, research, projects, and
          intellectual threads.
        </p>
        <small>{nowContent.updated}</small>
      </section>
      <section className="now-grid" aria-label="Current focus">
        {sections.map(([title, items]) => (
          <article className="now-card" key={title as string}>
            <h2>{title as string}</h2>
            <ul>
              {(items as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
