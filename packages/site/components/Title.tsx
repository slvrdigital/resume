import { useSize, type Size } from '@/hooks/useSize'

export interface Props {
  tag?: 'h1' | 'h2' | 'h3';
  size?: Size
  children?: React.ReactNode
  [key: string]: unknown
}

export default function Title({ size, tag, children, ...props }: Props) {
  const TagName = tag ?? 'h2'
  size ??= 'base'
  const className = useSize(size)

  return (
    <TagName className={`${className} mb-1`} {...props}>
      {children}
    </TagName>
  )
}
