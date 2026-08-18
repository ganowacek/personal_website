export type ResearchLink = {
  label: string;
  href: string;
};

export type ResearchEntry = {
  title: string;
  institution: string;
  group?: string;
  collaborators?: string;
  dates?: string;
  description: string;
  methods: string[];
  publications?: ResearchLink[];
  posters?: ResearchLink[];
  manuscripts?: ResearchLink[];
  code?: ResearchLink[];
  datasets?: ResearchLink[];
  links?: ResearchLink[];
};

export const researchEntries: ResearchEntry[] = [
  {
    title: "Research Assistant, Global Women's Health",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    dates: "Jul 2025 - Jul 2026",
    description:
      "I supported global maternal and perinatal health research at the intersection of biostatistics, machine learning, and medical imaging, including systematic screening, dataset documentation, reproducibility materials, and preparation for statistical modeling workflows.",
    methods: [
      "Biostatistics",
      "Machine Learning",
      "Medical Imaging",
      "Global Maternal Health",
      "Perinatal Health",
      "Reproducibility",
    ],
  },
  {
    title: "Research Technician, Commins Lab",
    institution: "UNC School of Medicine",
    group: "Commins Lab",
    dates: "Feb 2023 - Aug 2023",
    description:
      "I coordinated outreach for a follow-up clinical study, collected and transported biological samples, co-authored an Encyclopedia of Food Allergy chapter, and conducted literature reviews on food intolerances, mast cell disorders, and immunologic mechanisms.",
    methods: ["Clinical Study Coordination", "Biological Samples", "Literature Reviews", "Food Allergy", "Immunology"],
  },
];
