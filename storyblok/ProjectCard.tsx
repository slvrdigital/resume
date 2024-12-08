import Title from "@/components/Title";
import Content from "@/components/Content";

export interface Project {
  title: string;
  tags: string[];
  description: string;
}

export default function ProjectCard({ value }: { value: Project }) {
  return (
    <div>
      <Title
        dangerouslySetInnerHTML={{
          __html: value.title,
        }}
      />
      <ul className="mb-2 flex flex-wrap gap-1">
        {value.tags.map((tag: string, index: number) => (
          <li key={index} className="text-sm color-100">
            {tag}
            {value.tags.length > index + 1 && ", "}
          </li>
        ))}
      </ul>
      <Content html={value.description} />
    </div>
  );
}
