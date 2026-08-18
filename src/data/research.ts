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
    title: "Global Maternal and Perinatal Health Research",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    dates: "Jul 2025 - Jul 2026",
    description:
      "I supported global maternal and perinatal health research at the intersection of biostatistics, machine learning, and medical imaging.",
    methods: [
      "Biostatistics",
      "Machine Learning",
      "Medical Imaging",
      "Global Maternal Health",
      "Perinatal Health",
    ],
  },
  {
    title: "FAMLI Study Article Screening",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    dates: "Jul 2025 - Jul 2026",
    description:
      "I conducted systematic screening of 1,300+ articles across PubMed, Embase, and SCOPUS on gestational age and date of delivery.",
    methods: ["Systematic Screening", "PubMed", "Embase", "SCOPUS", "Gestational Age", "Date of Delivery"],
  },
  {
    title: "LABOR Study Dataset Documentation",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    dates: "Jul 2025 - Jul 2026",
    description:
      "I developed comprehensive dataset documentation, including data dictionaries, codebooks, and variable maps, for 1,100+ variables and 12,000+ participant encounters.",
    methods: [
      "Data Dictionaries",
      "Codebooks",
      "Variable Maps",
      "Reproducibility",
      "Statistical Modeling Preparation",
      "ML Pipeline Integration",
    ],
  },
  {
    title: "Commins Lab Clinical Research",
    institution: "UNC School of Medicine",
    group: "Commins Lab",
    dates: "Feb 2023 - Aug 2023",
    description:
      "I coordinated outreach for a follow-up clinical study, collected and transported biological samples, co-authored an Encyclopedia of Food Allergy chapter, and conducted literature reviews on food intolerances, mast cell disorders, and immunologic mechanisms.",
    methods: ["Clinical Study Coordination", "Biological Samples", "Literature Reviews", "Food Allergy", "Immunology"],
  },
];
