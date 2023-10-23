import React from 'react';
import SearchBarAndCreate from '../(components)/SearchBarAndCreate';
import { getSession } from '@/lib/auth';
import ListItemRealEstate from '../(components)/ListItemRealEstate';


const page = async () => {
  const session = await getSession();
  return (
    <div className="m-4">
      <SearchBarAndCreate/>
      <ListItemRealEstate session={session} />
    </div>
  );
};

export default page;
