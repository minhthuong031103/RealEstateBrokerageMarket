export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full px-10 lg:px-28">{children}</div>;
}
