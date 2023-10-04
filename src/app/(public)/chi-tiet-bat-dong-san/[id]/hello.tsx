"use client";

import { useSearchParams } from "next/navigation";

const Hello = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("ten"));

  return (
    <div>
      <div>hello</div>
    </div>
  );
};

export default Hello;
