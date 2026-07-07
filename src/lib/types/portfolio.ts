export type Link = {
  label: string;
  href: string;
};

export type ProfileLink = Link & {
  username: string;
};

export type Profile = {
  name: string;
  domain: string;
  role: string;
  company: string;
  location: string;
  email: string;
  focus: string;
  current: string;
  previous: string;
  links: ProfileLink[];
};

export type GithubProject = {
  name: string;
  description: string;
  href: string;
  language: string;
  updated: string;
  stars: number | string;
  topics: string[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  stack: string[];
  summary: string;
  links: Link[];
};

export type SkillGroup = {
  title: string;
  featured: string[];
  more: string[];
};

export type WritingPost = {
  title: string;
  description: string;
  slug?: string;
  published?: string;
};

export type SkillSummary = {
  primary: string[];
  secondary: string[];
  total: number;
};
