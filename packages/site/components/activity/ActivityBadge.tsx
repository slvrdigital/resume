import type { ActivityResource } from '@resume/activity/schemas/ActivitySchema'

interface Props {
  type: ActivityResource['source']
}

export default function ActivityBadge({ type }: Props) {
  let title
  const classNames = [
    'w-2',
    'h-2',
    'inline-flex',
    'border',
    'border-brand-100/50',
    'rounded-full'
  ]

  switch(type) {
    case 'strava': {
      classNames.push('bg-strava-primary')
      title = 'Strava'
      break
    }
    case 'github': {
      classNames.push('bg-github-primary');
      title = 'GitHub'
      break
    }
    default: classNames.push('bg-base')
  }

  return (
    <span title={title} className={classNames.join(' ')} />
  )
}