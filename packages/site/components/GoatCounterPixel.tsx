import Image from 'next/image'

interface Props {
  path: string
}

export default function GoatCounterPixel({ path }: Props) {
  return (
    <Image
      width={1}
      height={1}
      src={`https://yevheni.goatcounter.com/count?p=${encodeURIComponent(path)}`}
      alt=''
      style={{
        display: 'none'
      }}
    />
  )
}
