export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>header</div>
      {children}
    </div>
  );
}
