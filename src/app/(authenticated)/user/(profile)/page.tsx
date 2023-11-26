import { getSession } from '@/lib/auth';
import { UserProfile } from './UserProfile';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  return <UserProfile session={session} />;
};
export default page;
