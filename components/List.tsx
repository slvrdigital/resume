export default function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list">
      {children}
    </ul>
  );
}
