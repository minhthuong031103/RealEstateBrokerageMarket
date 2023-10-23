import React from 'react'
import { getSession } from '@/lib/auth';
import Header from './(components)/Header';
import { Sidebar } from './(components)/Sidebar';
import { DashboardIcon } from '@radix-ui/react-icons';
import { SubscriptIcon, UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import AgencyRegisterModal  from './(components)/AgencyRegisterModal';

const navItems = [
  {
    title: 'Danh sách BĐS đã tạo',
    value: '/',
    icon: <DashboardIcon className="w-5 h-5" />,
  },
  {
    title: 'Hồ sơ đối tác',
    value: 'profile',
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    title: 'Gói dịch vụ',
    value: 'goi-dich-vu',
    icon: <SubscriptIcon className="w-5 h-5" />,
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
      <div className="flex justify-between h-screen">
        <AgencyRegisterModal session={session}/>
        <Sidebar navItems={navItems} title="Navigation" />
        <div className="flex-1 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
