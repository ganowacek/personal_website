export type ExperienceItem = {
  title: string;
  organization: string;
  dates?: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    title: "Bookkeeper",
    organization: "Southern Village Club LLC",
    dates: "May 2025 - Present",
    summary: "I manage payroll for 60 employees using QuickBooks and Excel, prepare invoices, track facility charges, reconcile member accounts, and maintain financial documentation.",
  },
  {
    title: "Interim Club Director",
    organization: "Southern Village Club LLC",
    dates: "Jul 2023 - Aug 2023",
    summary: "I directed club operations including HR, vendor relations, and member services, implemented communication improvements, and supervised staff.",
  },
  {
    title: "Facilities Manager",
    organization: "Southern Village Club LLC",
    dates: "Jun 2022 - May 2025",
    summary: "I supervised pool operations, scheduling, and daily staff management, trained and evaluated lifeguards, and enforced safety protocols.",
  },
  {
    title: "Assistant Swim Coach",
    organization: "Southern Village Club LLC",
    dates: "May 2018 - Jul 2023",
    summary: "I coached youth swimmers ages 4-18 in competitive technique and race strategy, and assisted in meet operations and training program design.",
  },
  {
    title: "Head Lifeguard / Lifeguard",
    organization: "Southern Village Club LLC",
    dates: "May 2019 - Jun 2022",
    summary: "I supervised lifeguard staff, ensured compliance with safety and emergency protocols, conducted emergency drills and water quality testing, and responded to patron emergencies.",
  },
];
