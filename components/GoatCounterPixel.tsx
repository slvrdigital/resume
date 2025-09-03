interface Props {
  path: string
}

export default function GoatCounterPixel({ path }: Props) {
  return (
    <img
      src={`https://yevheni.goatcounter.com/count?p=${encodeURIComponent(path)}`}
      alt=''
      style={{
        display: 'none'
      }}
    />
  )
}
