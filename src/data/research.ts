export type ResearchLink = {
  label: string;
  href: string;
};

export type ResearchProject = {
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

export const researchProjects: ResearchProject[] = [
  {
    title: "HIV and Preeclampsia",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    dates: "Ongoing",
    description:
      "I study relationships among HIV, antiretroviral therapy, immunologic factors, and preeclampsia through statistical and systematic-review research.",
    methods: [
      "Systematic Review",
      "Meta-analysis",
      "Causal Inference",
      "Multiple Imputation",
      "Propensity-score Weighting",
      "CBPS",
      "Bootstrap Inference",
      "R",
    ],
  },
  {
    title: "FAMLI Study",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    description:
      "I work on research involving AI-assisted obstetric ultrasound and gestational-age estimation, with applications intended to improve prenatal care in low-resource environments.",
    methods: ["AI-assisted Ultrasound", "Gestational-age Estimation", "Data Analysis", "Public Health"],
  },
  {
    title: "LABOR Study",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    description:
      "I work with large maternal-health datasets involving thousands of pregnancy encounters and extensive clinical variables.",
    methods: [
      "Data Dictionaries",
      "Variable Harmonization",
      "Statistical Analysis",
      "Reproducible Workflows",
      "Secondary Analyses",
    ],
  },
  {
    title: "Gestational Age Dating Guidelines",
    institution: "UNC School of Medicine",
    group: "Global Women's Health",
    description:
      "I contribute to a scoping review comparing international guidance for pregnancy dating and ultrasound-based gestational-age assessment.",
    methods: ["Scoping Review", "Guideline Comparison", "Obstetric Ultrasound", "Evidence Synthesis"],
  },
];
