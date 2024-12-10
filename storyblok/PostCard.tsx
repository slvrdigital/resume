import Link from "next/link";
import Title from "@/components/Title";
import RichText from "@/storyblok/RichText";
import type { ResumePostSb } from "@/typings/storyblok";
import type { ISbStoryData } from "storyblok";

export default function PostCard({
  value,
}: {
  value: ISbStoryData<ResumePostSb> | string;
}) {
  if (typeof value === "string") return <div />;

  return (
    <div className="post">
      <Title tag="h3">
        <Link className="link" href={`/log/${value.slug}`}>
          {value.name}
        </Link>
      </Title>
      <RichText content={value.content.description} />
    </div>
  );
}
