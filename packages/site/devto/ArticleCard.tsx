import Link from 'next/link'
import Title from '@/components/Title'
import Content from '@/components/Content'

export default function ArticleCard({ value }: { value: Record<string, any> }) {
  return (
    <div className="post">
      <Title tag="h3">
        <Link className="link" href={value.url} target="_blank">
          {value.title}
        </Link>
      </Title>
      {value.tag_list.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-x-2 gap-y-0.5 text-sm text-brand-100">
          {value.tag_list.map((tag: string, index: number) => (
            <li key={index} title={tag} className="flex items-center gap-0.5">
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      )}
      <Content html={value.description} />
    </div>
  )
}
