import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Title from "@/components/Title";

const Post = ({ name, blok }: { name: string; blok: Record<string, any> }) => (
  <article className="post" {...storyblokEditable(blok)}>
    {name && (
      <header className="mb-8">
        <Title tag="h1" size="xl">
          {name}
        </Title>
      </header>
    )}

    {blok.body.map((nestedBlok: Record<string, any>) => (
      <StoryblokComponent
        id={nestedBlok._uid}
        blok={nestedBlok}
        key={nestedBlok._uid}
      />
    ))}
  </article>
);

export default Post;
