import {
  richTextResolver,
  type StoryblokRichTextNode,
} from "@storyblok/richtext";
import Content from "@/components/Content";

interface Props {
  className?: string;
  content: StoryblokRichTextNode;
}

const IFRAME_TAG = "<iframe";

const RichTextWithIframe = ({ content, className }: Props) => {
  const html = richTextResolver({
    resolvers: {
      text: (node) => {
        if (node.text?.includes(IFRAME_TAG)) return node.text;

        return richTextResolver().render(node);
      },
    },
  }).render(content);

  return <Content className={className} html={html as string} />;
};

export default RichTextWithIframe;
