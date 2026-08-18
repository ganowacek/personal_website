const assetBase = import.meta.env.BASE_URL;
export const withBasePath = (path: string) => `${assetBase}${path.replace(/^\/+/, "")}`;

export const siteConfig = {
  name: "George A Nowacek II",
  shortName: "George A Nowacek II",
  domain: "https://ganowacek.github.io/george-nowacek.com",
  email: "",
  github: "https://github.com/ganowacek",
  linkedin: "https://www.linkedin.com/in/george-a-nowacek-ii/",
  cv: withBasePath("George_Nowacek_CV.pdf"),
  headshot: withBasePath("headshot.jpg"),
  cvAvailable: true,
  title: "George A Nowacek II | Statistics, Research & Pure Mathematics",
  description:
    "I apply quantitative methods, computation, and pure mathematics to problems in medicine and public health.",
};

export const currentFocus = [
  "I'm pursuing graduate study in Statistics at Duke University",
  "I'm working on maternal-health and pregnancy research",
  "I'm building statistical computing workflows in R",
  "I'm studying quantitative methods for public health",
];

export const researchInterests = [
  "Biostatistics",
  "Epidemiology",
  "Maternal Health",
  "Causal Inference",
  "Bayesian Statistics",
  "Statistical Computing",
  "Data Visualization",
];

export const selectedTools = ["R", "Python", "Git", "GitHub", "tidyverse", "LaTeX", "SAS"];

export const nowContent = {
  updated: "I'll add a last-updated date here as this page becomes more current.",
  studying: [
    "I'm taking graduate statistics coursework at Duke University",
    "I'm studying Bayesian methods and causal inference for applied research questions",
  ],
  research: [
    "I'm contributing to maternal-health research with the UNC School of Medicine Global Women's Health group",
    "I'm developing reproducible workflows for pregnancy and obstetric datasets",
  ],
  building: [
    "I'm building research tooling for statistical analysis and documentation",
    "I'm maintaining a public home for publications, projects, and teaching materials",
  ],
  reading: ["I'll add current books, papers, and topics here."],
};
