export type ExperienceItem = {
  title: string;
  organization: string;
  type: "Research" | "Teaching" | "Employment" | "Leadership" | "Education";
  dates?: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    title: "Graduate Study in Statistics",
    organization: "Duke University",
    type: "Education",
    summary: "I am building graduate training in statistical theory, applied methodology, computation, and pure mathematics.",
  },
  {
    title: "Global Women's Health Research",
    organization: "UNC School of Medicine",
    type: "Research",
    summary:
      "I work across maternal health, pregnancy, epidemiology, obstetric ultrasound, and reproducible statistical analysis.",
  },
  {
    title: "Mathematics",
    organization: "University of North Carolina at Chapel Hill",
    type: "Education",
    summary: "I bring an undergraduate background in mathematics with cross-disciplinary academic experience.",
  },
  {
    title: "Graduate Teaching Assistant",
    organization: "Duke University",
    type: "Teaching",
    summary: "I support teaching in statistics, R, reproducible analysis, and data visualization.",
  },
  {
    title: "Professional Experience",
    organization: "Southern Village Club",
    type: "Employment",
    summary: "I include additional professional experience in my CV and can expand this entry over time.",
  },
];
