import React from 'react';
import { getSession } from '@/lib/auth';
import Header from './(components)/Header';
import { UserSidebar } from './(components)/UserSidebar';
import { UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Footer } from '@/components/footer';

const navItems = [
  {
    title: 'Hồ sơ',
    value: '/',
    icon: <UserIcon className="w-5 h-5" />,
  },

  // Add more items as needed
];
export default async function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect('/auth/login');
  return (
    <div className="w-full h-full bg-slate-50">
      <Header session={session} />
      {/* <Header session={session}/> */}
      <div className="flex flex-col lg:flex-row justify-between h-full ">
        <UserSidebar
          navItems={navItems}
          title="Navigation"
          className="w-full lg:basis-1/4 bg-white shadow-md"
        />
        <div className="flex-1 w-full h-full min-h-screen bg-slate-50">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
