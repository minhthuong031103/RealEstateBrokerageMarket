import React from 'react';
import { getSession } from '@/lib/auth';
import dynamic from 'next/dynamic';
const RealEstateListLayout = dynamic(
  () => import('../(components)/RealEstateListLayout'),
  {
    ssr: false,
  }
);
const page = async () => {
  const session = await getSession();
  return (
    <div className="m-4">
      <RealEstateListLayout session={session} />
    </div>
  );
};

export default page;
