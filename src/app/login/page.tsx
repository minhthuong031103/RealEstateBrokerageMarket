'use client';

import { Button } from '@/components/new-york/button';
import { useHelloWorld } from '@/hooks/useHelloWorld';
import React, { useEffect } from 'react';

function page() {
  const [ok] = React.useState(0);
  const { onGetHelloWorld } = useHelloWorld();
  const [fetchAgain, setFetchAgain] = React.useState(false);
  const functionAdd = () => {
    setFetchAgain(!fetchAgain);
  };

  useEffect(() => {
    async function getData() {
      const data = await onGetHelloWorld();
      console.log(data);
      const { user } = data;
      const user1 = data.user;
      console.log(user1);
      console.log(user.avatar);
    }
    getData();
  }, [fetchAgain]);

  console.log(ok);
  return (
    <div className="flex flex-col w-screen">
      {ok}
      <div className="w-[50%]">
        <Button onClick={functionAdd} className="w-[10%]">
          +
        </Button>
      </div>
      <div className="w-screen flex justify-center">
        <div className="flex justify-center border-2 border-solid px-10 py-2">
          <p className="text-black font-bold">UK 6</p>
        </div>
      </div>
    </div>
  );
}

export default page;
