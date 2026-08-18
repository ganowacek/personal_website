export type EducationItem = {
  institution: string;
  degree: string;
  dates?: string;
  concentrations?: string[];
  coursework?: string[];
  honors?: string[];
};

export const education: EducationItem[] = [
  {
    institution: "Duke University",
    degree: "I am pursuing graduate study in Statistics",
    coursework: ["I'll add selected coursework here"],
  },
  {
    institution: "University of North Carolina at Chapel Hill",
    degree: "I studied Mathematics",
    coursework: ["I'll add selected coursework here"],
  },
];
