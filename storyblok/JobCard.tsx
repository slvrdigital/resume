import Title from "@/components/Title";
import RichText from "@/storyblok/RichText";
import type { ResumeJobSb } from "@/typings/storyblok";
import type { ISbStoryData } from "storyblok";

export default function JobCard({
  value,
}: {
  value: ISbStoryData<ResumeJobSb> | string;
}) {
  const getYear = (date: string) => new Date(date).getFullYear();

  if (typeof value === "string") return <div />;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <p className="color-100">
        <span>{getYear(value.content.start_date!)}</span>
        <span> — </span>
        <span>
          {value.content.end_date ? getYear(value.content.end_date) : "Now"}
        </span>
      </p>

      <div className="sm:col-span-2">
        <Title tag="h3">
          {value.content.position} at{" "}
          <a
            href={value.content.company_url?.url}
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
