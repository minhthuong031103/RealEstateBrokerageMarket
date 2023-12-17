"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineHeart } from "react-icons/ai";
export function LikeShareGroup() {
  return (
    <div className="flex flex-row space-x-4">
      <Button className="rounded-full text-slate-50 bg-red-400 w-[42px] h-[42px] text-[24px] p-0 hover:bg-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]">
        <AiOutlineHeart />
      </Button>
      <Button className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0 hover:bg-slate-50 hover:text-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]">
        <AiOutlineHeart />
      </Button>
    </div>
  );
}
