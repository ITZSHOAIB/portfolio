import { site } from "$content/site";
import { blogPosts } from "$lib/content/blog";
import { experience } from "$content/experience";
import { githubProjects } from "$content/github-projects";
import { careerStartDate, profile } from "$content/profile";
import { selectedWork } from "$content/selected-work";
import { skillGroups } from "$content/skills";
import { formatExperience } from "$lib/utils/experience";
import type { PageLoad } from "./$types";

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
  const visibleBlogPosts = site.features.blog ? blogPosts : [];

  return {
    profile,
    projects: githubProjects,
    selectedWork,
    experience,
    skillSummary: {
      primary: primarySkillNames,
      secondary: secondarySkillNames,
      total: allSkillNames.length,
    },
    blog: {
      enabled: site.features.blog && visibleBlogPosts.length > 0,
      posts: visibleBlogPosts,
    },
    experienceText: formatExperience(careerStartDate, new Date()),
    site,
  };
};
