import React from 'react';

function layout({ children }) {
  return (
    <div className="px-8 lg:px-36 py-8 w-full h-full items-center-justify-center flex flex-col">
      <div className="justify-center w-full">
        <h1 className="font-bold text-center tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl">
          Cart
        </h1>
      </div>
      {children}
    </div>
  );
}

export default layout;
