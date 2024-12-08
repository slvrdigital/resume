import { storyblokEditable } from "@storyblok/react";
import Section from "@/components/Section";
import RichText from "@/storyblok/RichText";

const PostContent = ({ blok }: { blok: Record<string, any> }) => {
  return (
    <Section title={blok.title} {...storyblokEditable(blok)}>
      <RichText content={blok.content} />
    </Section>
  );
};

export default PostContent;
