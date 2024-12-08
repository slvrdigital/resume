import type { StoryblokLink } from "@/types";

export interface Ref {
  label: string;
  text: string;
  reference: StoryblokLink;
}

export default function RefCard({ value }: { value: Ref }) {
  return (
    <div className="grid gap-4 grid-cols-3">
      <p className="color-100">{value.label}</p>
      <p className="col-span-2">
        <a className="link" href={value.reference.url} target="_blank">
          {value.text}
        </a>
      </p>
    </div>
  );
}
