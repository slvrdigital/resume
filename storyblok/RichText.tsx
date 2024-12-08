import {
  richTextResolver,
  type StoryblokRichTextNode,
} from "@storyblok/richtext";

interface Props {
  className?: string;
  content: StoryblokRichTextNode;
}

const IFRAME_TAG = "<iframe";

const RichTextWithIframe = ({ content, className = "content" }: Props) => {
  const html = richTextResolver({
    resolvers: {
      text: (node) => (node.text?.includes(IFRAME_TAG) ? node.text : node.text),
    },
  }).render(content);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: html as string,
      }}
    />
  );
};

export default RichTextWithIframe;
