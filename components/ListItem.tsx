export default function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="list-item">
      {children}
    </li>
  );
}
