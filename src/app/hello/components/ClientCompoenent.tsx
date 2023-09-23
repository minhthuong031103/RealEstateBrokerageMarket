'use client';

import { Button } from '@/components/new-york/button';
import React from 'react';

function ClientCompoenent({ res, user }) {
  console.log(res, user);
  return (
    <div>
      {user?.map((item) => {
        return <div key={`${item.name}${item.id}`}>{item.name}</div>;
      })}
      <Button onClick={() => {}}>ok</Button>
    </div>
  );
}

export default ClientCompoenent;
