import {
  storyblokEditable,
  RichTextResolver,
  type ISbRichtext,
} from "@storyblok/react";
import Title from "@/components/Title";

const PostContent = ({ blok }: { blok: Record<string, any> }) => {
  const richText = (data: ISbRichtext) => new RichTextResolver().render(data);

  return (
    <section className="post section" {...storyblokEditable(blok)}>
      {blok.title && <Title size="lg">{blok.title}</Title>}

      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: richText(blok.content),
        }}
      />
    </section>
  );
};

export default PostContent;
