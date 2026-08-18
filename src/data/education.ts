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
    degree: "M.S. in Statistical Science",
    dates: "Aug 2026 - May 2028 (Expected)",
    coursework: [
      "Theory of Statistical Inference",
      "Statistical Programming",
      "Predictive Modeling",
      "SQL",
      "Optimization in ML",
    ],
  },
  {
    institution: "University of North Carolina at Chapel Hill",
    degree: "B.S. in Mathematics - Minor: Statistics and Analytics",
    dates: "Aug 2023 - May 2026",
    coursework: [
      "Introduction to Probability",
      "Real Analysis",
      "Stochastic Modeling",
      "Linear Algebra for Applications",
      "Combinatorics",
      "Introduction to Numerical Analysis",
      "Differential Equations",
      "Topology",
    ],
    honors: [
      "Morehead-Cain Sophomore Induction Nominee",
      "Dean's List, Spring 2024 and Spring 2026",
    ],
  },
  {
    institution: "University of Georgia",
    degree: "B.S. in Chemistry and Pharmaceutical Sciences (transferred)",
    dates: "Aug 2022 - Jan 2023",
    coursework: ["General Chemistry I & II", "Principles of Biology", "General Physics I"],
  },
];
