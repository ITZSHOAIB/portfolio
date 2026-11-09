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
  /** Slug of a page in src/content/projects; the card links there instead of `href`. */
  page?: string;
  language: string;
  updated: string;
  stars: number | string;
  topics: string[];
  metrics?: {
    value: string;
    label: string;
    icon: "downloads" | "stars";
  }[];
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
  highlights: string[];
  links: Link[];
};

export type SelectedWork = {
  name: string;
  context: string;
  description: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
};

export type SkillGroup = {
  title: string;
  featured: string[];
  more: string[];
};

export type BlogPost = {
  title: string;
  description: string;
  slug: string;
  published: string;
  updated?: string;
  tags: string[];
  readingMinutes: number;
};

export type SkillSummary = {
  primary: string[];
  secondary: string[];
  total: number;
};
