import {
  richTextResolver,
  type StoryblokRichTextNode,
} from "@storyblok/richtext";
import Content from "@/components/Content";
import type { ResumeRichtextSb } from "@/typings/storyblok";

interface Props {
  className?: string;
  content?: ResumeRichtextSb;
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
  }).render(content as StoryblokRichTextNode);

  return <Content className={className} html={html as string} />;
};

export default RichTextWithIframe;
