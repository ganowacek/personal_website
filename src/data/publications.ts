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

export const publications: Publication[] = [];
