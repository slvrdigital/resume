import { formatDistanceToNow, parseISO, format } from 'date-fns'

export function formatDate(dateString: string): string {
  const date = parseISO(dateString)

  // calculate the distance to now
  const distance = formatDistanceToNow(date, { addSuffix: true })

  // date is within the last 7 days
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  if (date > sevenDaysAgo) {
    return distance // e.g., "2 days ago" or "5 hours ago"
  }

  return format(date, 'MMM d, yyyy')
}
