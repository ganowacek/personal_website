export type ExperienceItem = {
  title: string;
  organization: string;
  type: "Research" | "Teaching" | "Employment" | "Leadership" | "Education" | "Fellowship";
  dates?: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    title: "Graduate Study in Statistics",
    organization: "Duke University",
    type: "Education",
    dates: "Aug 2026 - May 2028 (Expected)",
    summary: "I am pursuing an M.S. in Statistical Science.",
  },
  {
    title: "Research Assistant, Global Women's Health",
    organization: "UNC School of Medicine",
    type: "Research",
    dates: "Jul 2025 - Jul 2026",
    summary:
      "I supported global maternal and perinatal health research at the intersection of biostatistics, machine learning, and medical imaging.",
  },
  {
    title: "B.S. in Mathematics",
    organization: "University of North Carolina at Chapel Hill",
    type: "Education",
    dates: "Aug 2023 - May 2026",
    summary: "I studied Mathematics with a minor in Statistics and Analytics.",
  },
  {
    title: "Graduate Teaching Assistant",
    organization: "Duke University",
    type: "Teaching",
    dates: "Jul 2026 - Present",
    summary: "I lead coding lab sections and mentor undergraduate students in R, data visualization, reproducible research, and foundational statistical concepts.",
  },
  {
    title: "Fons Vitae Medical Humanities Fellowship",
    organization: "Duke Divinity School",
    type: "Fellowship",
    dates: "Sep 2025 - May 2026",
    summary: "I was selected for a year-long interdisciplinary program uniting UNC and Duke students to study medicine, healing, and human flourishing through theology, ethics, and literature.",
  },
  {
    title: "Bookkeeper",
    organization: "Southern Village Club",
    type: "Employment",
    dates: "May 2025 - Present",
    summary: "I manage payroll for 60 employees using QuickBooks and Excel, prepare invoices, track facility charges, reconcile member accounts, and maintain financial documentation.",
  },
];
