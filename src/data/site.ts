const assetBase = import.meta.env.BASE_URL;
export const withBasePath = (path: string) => `${assetBase}${path.replace(/^\/+/, "")}`;

export const siteConfig = {
  name: "George A Nowacek II",
  shortName: "George A Nowacek II",
  domain: "https://ganowacek.github.io/george-nowacek.com",
  email: "geanowacek@gmail.com",
  linkedin: "https://www.linkedin.com/in/george-a-nowacek-ii/",
  cv: withBasePath("George_Nowacek_CV.pdf"),
  headshot: withBasePath("headshot.jpg"),
  diagram: withBasePath("og-card.png"),
  cvAvailable: true,
  title: "George A Nowacek II | Statistics, Research & Pure Mathematics",
  description:
    "I am pursuing an M.S. in Statistical Science at Duke University, with research and teaching experience across global health data science, maternal health, statistical computing, and medical humanities.",
};

export const currentFocus = [
  "I'm pursuing an M.S. in Statistical Science at Duke University",
  "I'm serving as a Graduate TA for global health data science",
  "I'm working with R, data visualization, and reproducible research",
  "I'm continuing professional bookkeeping work with Southern Village Club",
];

export const researchInterests = [
  "Biostatistics",
  "Global Maternal Health",
  "Perinatal Health",
  "Medical Imaging",
  "Machine Learning",
  "Statistical Computing",
  "Systematic Screening",
  "Data Visualization",
  "Medical Humanities",
];

export const selectedTools = [
  "R",
  "Python",
  "SAS",
  "LaTeX",
  "Julia (basic)",
  "Excel",
  "Google Sheets",
  "QuickBooks Payroll",
  "Canvas LMS",
];

export const nowContent = {
  updated: "Current as of my August 2026 CV.",
  studying: [
    "I'm pursuing an M.S. in Statistical Science at Duke University, expected May 2028",
    "My coursework includes Theory of Statistical Inference, Statistical Programming, Predictive Modeling, SQL, Real Analysis, Stochastic Modeling, and Optimization in ML",
  ],
  research: [
    "I supported global maternal and perinatal health research with UNC School of Medicine's Global Women's Health group",
    "I developed dataset documentation for 1,100+ variables and 12,000+ participant encounters in the LABOR Study",
  ],
  building: [
    "I lead coding lab sections for STA 198L: Introduction to Global Health Data Science",
    "I manage payroll, invoices, facility charges, and account reconciliation as Bookkeeper for Southern Village Club",
  ],
  reading: [
    "Through the Fons Vitae Medical Humanities Fellowship, I study medicine, healing, and human flourishing through theology, ethics, and literature",
  ],
};
