export interface ActivityCardProps {
  date: React.ReactNode
  children: React.ReactNode
}

export default function ActivityCard({ date, children }: ActivityCardProps) {
  return (
    <article className="grid gap-4 sm:grid-cols-3">
      <p className="text-brand-100">
        {date}
      </p>

      <div className="sm:col-span-2">
        {children}
      </div>
    </article>
  )
}
