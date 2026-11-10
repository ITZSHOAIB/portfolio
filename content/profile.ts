import type { Profile } from "$lib/types/portfolio";

// Start of professional experience; drives the "N+ years" figure everywhere.
export const careerStartDate = new Date("2020-02-14T00:00:00Z");

export const profile = {
  name: "Sohab Sk",
  givenName: "Sohab",
  familyName: "Sk",
  domain: "sohab.dev",
  role: "Senior Software Engineer",
  company: "Skillsoft / Codecademy",
  location: "India, remote",
  email: "sksohablocal@gmail.com",
  focus: "Reliable AI Agents & scalable software systems.",
  current:
    "Leading agentic AI product work at Skillsoft / Codecademy: multi-agent authoring, learning-by-building engines, and the reusable frameworks behind them.",
  previous:
    "Previously built enterprise blockchain SaaS at EY GDS.",
  links: [
    {
      label: "GitHub",
      username: "@ITZSHOAIB",
      href: "https://github.com/ITZSHOAIB",
    },
    {
      label: "LinkedIn",
      username: "/in/IITZSHOAIB",
      href: "https://www.linkedin.com/in/IITZSHOAIB",
    },
    {
      label: "Twitter/X",
      username: "@0xSohab",
      href: "https://twitter.com/0xSohab",
    },
    {
      label: "YouTube",
      username: "@4techloverz",
      href: "https://www.youtube.com/4techloverz",
    },
    {
      label: "Email",
      username: "sksohablocal@gmail.com",
      href: "mailto:sksohablocal@gmail.com",
    },
  ],
} satisfies Profile;
