import { storyblokEditable } from "@storyblok/react";
import Section from "@/components/Section";
import RichText from "@/storyblok/RichText";

const PostContent = ({ blok }: { blok: Record<string, any> }) => {
  return (
    <Section title={blok.title} spacing="compact" {...storyblokEditable(blok)}>
      <RichText
        className="content text-base font-sans leading-relaxed"
        content={blok.content}
      />
    </Section>
  );
};

export default PostContent;
