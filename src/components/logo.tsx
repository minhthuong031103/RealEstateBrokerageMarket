import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link className="w-[200px]" href={'/'}>
      <div className="items-center w-full flex flex-row gap-2">
        <Image
          src={
            'https://utfs.io/f/2d7566c9-a715-4a1e-8d05-140479024390_shoes%20(1).png'
          }
          width={40}
          height={40}
        />

        <div className="text-lg w-full font-bold tracking-tight">UITSport</div>
      </div>
    </Link>
  );
}

export default Logo;
