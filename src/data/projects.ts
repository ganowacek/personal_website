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
    title: "LABOR Study Documentation",
    category: "Research Documentation",
    description:
      "I developed data dictionaries, codebooks, and variable maps for 1,100+ variables and 12,000+ participant encounters.",
    tools: ["Data Dictionaries", "Codebooks", "Variable Maps", "Reproducibility"],
    featured: true,
  },
  {
    title: "FAMLI Study Screening",
    category: "Evidence Screening",
    description:
      "I conducted systematic screening of 1,300+ articles across PubMed, Embase, and SCOPUS on gestational age and date of delivery.",
    tools: ["PubMed", "Embase", "SCOPUS", "Gestational Age"],
    featured: true,
  },
  {
    title: "Collab-CXR Teaching Dataset Preparation",
    category: "Teaching Dataset",
    description:
      "I support collaborative data science projects for STA 198L, including preparation of the Collab-CXR teaching dataset.",
    tools: ["R", "Data Visualization", "Reproducible Research", "Teaching"],
  },
];
