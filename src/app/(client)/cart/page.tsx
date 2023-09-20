'use client';

import React, { useEffect, useState } from 'react';
import LeftCart from './LeftCart';
import RightCart from './RightCart';

function page() {
  const [width, setWidth] = useState(window?.innerWidth);
  useEffect(() => {
    // Function to update the window width whenever it changes
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Attach an event listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="w-full py-10 md:py-20">
      <div
        className="w-full flex-col max-w-[1280px] px-5
md:px-10 mx-auto relative"
      >
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px]">
          <div className=" w-full md:w-auto flex-[1.8] max-w-[500px] lg:max-w-full lg:mx-0">
            <LeftCart />
            {width < 1024 ? <RightCart /> : null}
          </div>
          {width > 1024 ? (
            <div className="flex-[1] py-5">
              <RightCart />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default page;
