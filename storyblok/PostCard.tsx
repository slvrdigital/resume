import Link from "next/link";
import Title from "@/components/Title";
import RichText from "@/storyblok/RichText";
import type { StoryblokRichTextNode } from "@storyblok/richtext";

export interface Post {
  name: string;
  slug: string;
  content: {
    description: StoryblokRichTextNode;
  };
}

export default function PostCard({ value }: { value: Post }) {
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
