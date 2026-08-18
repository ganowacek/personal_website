export type Fellowship = {
  name: string;
  organization: string;
  dates?: string;
  description: string;
};

export const fellowships: Fellowship[] = [
  {
    name: "Fons Vitae Medical Humanities Fellowship",
    organization: "Duke Divinity School",
    dates: "Sep 2025 - May 2026",
    description:
      "I was selected for a year-long interdisciplinary program uniting UNC and Duke students to study medicine, healing, and human flourishing through theology, ethics, and literature.",
  },
];
