import { getSession } from '@/lib/auth';
import dynamic from 'next/dynamic';
const ChiTietComponent = dynamic(
  () => import('./(components)/ChiTietComponent'),
  { ssr: false }
);
export default async function page({ params }) {
  const session = await getSession();

  return <ChiTietComponent id={params.id} session={session} />;
}
