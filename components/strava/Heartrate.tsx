import Tag from "@/components/Tag";

export default function Time({ value }: { value: number }) {
  return (
    <Tag title="Average heartrate" className="flex items-center gap-1">
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="w-3 h-3"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
      <span>{value}bpm</span>
    </Tag>
  );
}
