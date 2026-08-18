export type PublicationStatus =
  | "Published"
  | "In Press"
  | "Under Review"
  | "Manuscript in Preparation"
  | "Conference Presentation";

export type Publication = {
  title: string;
  authors: string;
  journal?: string;
  year?: number;
  doi?: string;
  pubmed?: string;
  pdf?: string;
  citation?: string;
  status: PublicationStatus;
};

export const publications: Publication[] = [
  {
    title: "Masqueraders of Food Allergy",
    authors: "Nowacek II, G.",
    journal: "Encyclopedia of Food Allergy",
    year: 2024,
    doi: "10.1016/B978-0-323-96018-2.00102-4",
    citation: "Nowacek II, G. (2024). Masqueraders of Food Allergy. In Encyclopedia of Food Allergy.",
    status: "Published",
  },
];
