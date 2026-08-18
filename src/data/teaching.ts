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
    course: "STA 198L: Introduction to Global Health Data Science",
    role: "Graduate Teaching Assistant in Statistics",
    term: "Jul 2026 - Present",
    description:
      "I serve as Graduate TA under Dr. Amy Herring, lead coding lab sections, mentor undergraduates in R, data visualization, reproducible research, and foundational statistical concepts, and support grading and collaborative data science projects.",
    topics: ["R", "Data Visualization", "Reproducible Research", "Foundational Statistics", "Collab-CXR"],
  },
  {
    institution: "University of North Carolina at Chapel Hill",
    course: "IDST 89: Way of Medicine",
    role: "Head Undergraduate Teaching Assistant",
    term: "Aug 2024 - May 2026",
    description:
      "I supported Dr. John Thorp Jr. in teaching a seminar on ethical and philosophical issues in modern medical practice, managed Canvas LMS, graded assignments, co-led seminar discussions, facilitated structured debates, and participated in TA candidate interviews.",
    topics: ["Canvas LMS", "Medical Humanities", "Ethics", "Public Health", "Seminar Discussion"],
  },
];
