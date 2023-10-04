import { Footer } from '@/components/footer';
import React from 'react';
import { ProfileSideBar } from './ProfileSidebar';

export default function layout({ children }) {
  return (
    <div className="w-full h-full">
      <ProfileSideBar />
      <div className="w-full h-full px-4 lg:px-32 py-12 lg:py-24 ">
        {children}
      </div>

      <Footer />
    </div>
  );
}
