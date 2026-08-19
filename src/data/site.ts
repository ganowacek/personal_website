const assetBase = import.meta.env.BASE_URL;
export const withBasePath = (path: string) => `${assetBase}${path.replace(/^\/+/, "")}`;

export const siteConfig = {
  name: "George A. Nowacek II",
  shortName: "George A. Nowacek II",
  domain: "https://ganowacek.github.io/personal_website",
  email: "geanowacek@gmail.com",
  linkedin: "https://www.linkedin.com/in/george-a-nowacek-ii/",
  github: "https://github.com/ganowacek",
  cv: withBasePath("George_Nowacek_CV.pdf"),
  headshot: withBasePath("headshot.jpg"),
  cvAvailable: true,
  title: "George A. Nowacek II | Statistics, Research & Pure Mathematics",
  description:
    "I am pursuing an M.S. in Statistical Science at Duke University, with research and teaching experience across global health data science, maternal health, statistical computing, and medical humanities.",
};

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
