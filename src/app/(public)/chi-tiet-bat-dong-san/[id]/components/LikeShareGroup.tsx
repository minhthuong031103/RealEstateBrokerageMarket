"use client";

import { Button } from "@/components/ui/button";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
export function LikeShareGroup() {
  return (
    <div className="flex flex-row space-x-4">
      <Button className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0">
        <AiOutlineHeart />
      </Button>
      <Button className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0">
        <AiOutlineShareAlt />
      </Button>
    </div>
  );
}
