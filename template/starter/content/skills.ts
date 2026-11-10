import type { SkillGroup } from "$lib/types/portfolio";

// `featured` skills show first; `more` skills sit behind "show more".
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    featured: ["TypeScript", "Go", "SQL"],
    more: ["Python", "Bash"],
  },
  {
    title: "Platform",
    featured: ["Kubernetes", "PostgreSQL", "GitHub Actions"],
    more: ["Terraform", "Kafka", "AWS"],
  },
];
