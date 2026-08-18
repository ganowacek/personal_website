export type Project = {
  title: string;
  category: string;
  description: string;
  screenshot?: string;
  github?: string;
  demo?: string;
  tools: string[];
  date?: string;
  featured?: boolean;
  stars?: number;
};

export const projects: Project[] = [
  {
    title: "Research Workflow Templates",
    category: "Research Tools",
    description:
      "I use reusable project structures for statistical analysis, documentation, and reproducible research outputs.",
    tools: ["R", "Quarto", "Git", "GitHub"],
    featured: true,
  },
  {
    title: "Maternal Health Analysis Utilities",
    category: "Statistical Computing",
    description:
      "I am collecting curated scripts and analysis helpers that support maternal-health research workflows.",
    tools: ["R", "tidyverse", "Epidemiology"],
    featured: true,
  },
  {
    title: "Interactive Data Visualization Experiments",
    category: "Data Visualization",
    description:
      "I use this space for exploratory graphics, teaching demos, and public-facing statistical explainers.",
    tools: ["Python", "React", "Data Visualization"],
  },
];
