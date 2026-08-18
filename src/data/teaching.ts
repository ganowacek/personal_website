export type TeachingExperience = {
  institution: string;
  course?: string;
  role: string;
  term?: string;
  website?: string;
  description: string;
  topics: string[];
};

export const teaching: TeachingExperience[] = [
  {
    institution: "Duke University",
    role: "Graduate Teaching Assistant in Statistics",
    description:
      "I support statistics coursework with emphasis on computation, data visualization, and reproducible analysis.",
    topics: ["Introductory Statistics", "R", "tidyverse", "GitHub", "Data Visualization"],
  },
  {
    institution: "University of North Carolina at Chapel Hill",
    role: "Teaching and Academic Leadership",
    description:
      "I have previous teaching and academic leadership experience, including medical-humanities education.",
    topics: ["Academic Mentorship", "Medical Humanities", "Communication"],
  },
];
