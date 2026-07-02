import { site } from "$lib/config/site";
import { writingPosts } from "$lib/content/writing";
import {
  experience,
  githubProjects,
  profile,
  skillGroups,
} from "$lib/data/portfolio";
import { formatExperience } from "$lib/utils/experience";
import type { PageLoad } from "./$types";

const experienceStartDate = new Date("2020-02-14T00:00:00Z");

const primarySkillNames = Array.from(
  new Set(skillGroups.flatMap((group) => group.featured)),
);

const allSkillNames = Array.from(
  new Set([
    ...primarySkillNames,
    ...skillGroups.flatMap((group) => group.more),
  ]),
);

const secondarySkillNames = allSkillNames.filter(
  (skill) => !primarySkillNames.includes(skill),
);

export const load: PageLoad = () => {
  const visibleWritingPosts = site.features.writing ? writingPosts : [];

  return {
    profile,
    projects: githubProjects,
    experience,
    skillSummary: {
      primary: primarySkillNames,
      secondary: secondarySkillNames,
      total: allSkillNames.length,
    },
    writing: {
      enabled: site.features.writing && visibleWritingPosts.length > 0,
      posts: visibleWritingPosts,
    },
    experienceText: formatExperience(experienceStartDate, new Date()),
    siteUrl: site.url,
  };
};
