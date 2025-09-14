export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-2xl px-6 mx-auto">
      {children}
    </div>
  )
}
