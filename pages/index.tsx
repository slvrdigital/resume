import { PageConfig } from "next";
import meta from "@/public/data/meta.json";
import projects from "@/public/data/projects.json";
import Section from "@/components/Section";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Strava from "@/components/strava/Strava";
import { getStoryblokApi } from "@storyblok/react";
import type { Activity } from "@/types";
import JobCard, { type Job } from "@/storyblok/JobCard";
import RefCard, { type Ref } from "@/storyblok/RefCard";
import PostCard, { type Post } from "@/storyblok/PostCard";
import ProjectCard, { type Project } from "@/storyblok/ProjectCard";
import RichText from "@/storyblok/RichText";
import { useStoryblok } from "@/hooks/useStoryblok";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

interface PageProps {
  page: Record<string, any>;
  posts: Record<string, any>[];
  activities: Activity[];
}

export default function Index({ page, activities }: PageProps) {
  return (
    <>
      <Section title="About">
        <RichText content={page.story.content.about} />
      </Section>

      <Section title="Contact">
        <List variant="compact">
          {page.story.content.links.map((ref: Ref, index: number) => (
            <ListItem key={index}>
              <RefCard value={ref} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Work Experience">
        <List>
          {page.story.content.jobs.map((job: Job, index: number) => (
            <ListItem key={index}>
              <JobCard value={job} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Log" href="/log">
        <List>
          {page.story.content.posts.map((post: Post, index: number) => (
            <ListItem key={index}>
              <PostCard value={post} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Side Projects">
        <List>
          {projects.map((project: Project, index: number) => (
            <ListItem key={index}>
              <ProjectCard value={project} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Recent Activities" href={meta.strava_profile}>
        <Strava activities={activities} />
      </Section>
    </>
  );
}

export async function getServerSideProps() {
  const { page, activities } = await fetchData();

  return {
    props: {
      meta: {
        title: "Index",
        description: meta.site_description,
      },
      activities,
      page,
    },
  };
}

export async function fetchData() {
  const sbParams = useStoryblok({
    resolve_relations: ["index.jobs", "index.posts"],
  }).params;

  const storyblokApi = getStoryblokApi();
  const { data: page = {} } = await storyblokApi.get(
    `cdn/stories/index`,
    sbParams,
    { cache: "no-store" }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/strava`);
  const activities = await response.json();

  return {
    page,
    activities,
  };
}
