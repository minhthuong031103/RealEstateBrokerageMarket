"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { Snippet } from "@nextui-org/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
export function LikeShareGroup({ userIdOfWriter }) {
  const userId = 1;
  return (
    <div className="flex flex-row space-x-4">
      {userId !== userIdOfWriter ? (
        <Button className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0">
          <AiOutlineHeart />
        </Button>
      ) : (
        <></>
      )}
      <Dialog>
        <DialogTrigger>
          <Button className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0 border-transparent hover:bg-transparent hover:text-blue-500">
            <AiOutlineShareAlt />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-fit p-6">
            <div className="flex flex-col gap-2">
              Share
              <a
                href={`https://www.facebook.com/dialog/share?app_id=87741124305&href=${window.location.href}&display=popup`}
              >
                <img
                  src="https://th.bing.com/th/id/OIP.CDaJK2XeVL95udO-fw0uKwHaHa?pid=ImgDet&rs=1"
                  className="w-[42px] h-[42px]"
                />
              </a>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              Sao chép địa chỉ liên kết
              <Snippet variant="bordered">{window.location.href}</Snippet>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
