import React from 'react';
import SearchBarAndCreate from '../(components)/SearchBarAndCreate';
import { getSession } from '@/lib/auth';
import RealEstateListLayout from '../(components)/RealEstateListLayout';


const page = async () => {
  const session = await getSession();
  return (
    <div className="m-4">
      <SearchBarAndCreate/>
      <RealEstateListLayout session={session} />
    </div>
  );
};

export default page;
