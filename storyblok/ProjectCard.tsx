import Title from "@/components/Title";

export interface Project {
  title: string;
  tags: string[];
  description: string;
}

export default function ProjectCard({ value }: { value: Project }) {
  return (
    <div className="project">
      <Title tag="h3" dangerouslySetInnerHTML={{ __html: value.title }} />
      <ul className="tags">
        {value.tags.map((tag: string, index: number) => (
          <li key={index} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: value.description }}
      />
    </div>
  );
}
