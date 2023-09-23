import React from 'react';
import ClientCompoenent from './components/ClientCompoenent';

import { useHello } from '@/hooks/useHello';
import { useUser } from '@/hooks/useUser';

async function page() {
  const { getHello } = useHello();
  const { getAllUsers } = useUser();
  const res = await getHello();
  const user = await getAllUsers();
  return (
    <div>
      <ClientCompoenent res={res} user={user} />
    </div>
  );
}

export default page;
