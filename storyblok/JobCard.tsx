import Title from "@/components/Title";
import RichText from "@/storyblok/RichText";
import type { StoryblokRichTextNode } from "@storyblok/richtext";
import type { StoryblokLink } from "@/types";

export interface Job {
  content: {
    position: string;
    company_name: string;
    company_url: StoryblokLink;
    start_date: string;
    end_date: string;
    details: StoryblokRichTextNode;
    summary: StoryblokRichTextNode;
  };
}

export default function JobCard({ value }: { value: Job }) {
  const getYear = (date: string) => new Date(date).getFullYear();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <p className="color-100">
        <span>{getYear(value.content.start_date)}</span>
        <span> — </span>
        <span>
          {value.content.end_date ? getYear(value.content.end_date) : "Now"}
        </span>
      </p>

      <div className="sm:col-span-2">
        <Title tag="h3">
          {value.content.position} at{" "}
          <a
            href={value.content.company_url.url}
            className="link"
            target="_blank"
          >
            {value.content.company_name}
          </a>
        </Title>
        <RichText
          className="text-sm mb-4 color-100"
          content={value.content.details}
        />
        <RichText content={value.content.summary} />
      </div>
    </div>
  );
}
