'use client';
import { Button } from '@/components/ui/button';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { Snippet } from '@nextui-org/react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useBatDongSan } from '@/hooks/useBatDongSan';
export function LikeShareGroup({ userIdOfWriter, postId, session }) {
  const { checkTonTaiYeuThich, themVaoYeuThich, xoaKhoiYeuThich } =
    useBatDongSan();
  const userId = session?.data?.user?.id ? session?.data?.user?.id : -1;

  const [isExists, setIsExists] = useState(true);
  const [url, setUrl] = useState('');
  useEffect(() => {
    const checkExist = async () => {
      await checkTonTaiYeuThich(userId, postId).then((data) => {
        if (data === null) {
          setIsExists(false);
        } else setIsExists(true);
      });
    };
    checkExist();
    setUrl(window.location.href);
  }, []);
  const addToFavourites = async () => {
    setIsExists(true);
    const data = {
      userId: userId,
      postId: postId,
    };
    await themVaoYeuThich(data);
  };
  const removeFromFavourites = async () => {
    setIsExists(false);
    const data = {
      userId: userId,
      postId: postId,
    };
    await xoaKhoiYeuThich(data);
  };
  console.log(userId, userIdOfWriter);
  return (
    <div className="flex flex-row space-x-4">
      {userId !== userIdOfWriter && isExists && userId !== -1 ? (
        <Button
          className="rounded-full text-slate-50 bg-red-400 w-[42px] h-[42px] text-[24px] p-0 hover:bg-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]"
          onClick={removeFromFavourites}
        >
          <AiOutlineHeart />
        </Button>
      ) : userId !== userIdOfWriter && !isExists && userId !== -1 ? (
        <Button
          className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0 hover:bg-slate-50 hover:text-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]"
          onClick={addToFavourites}
        >
          <AiOutlineHeart />
        </Button>
      ) : (
        <></>
      )}
      <Dialog>
        <DialogTrigger>
          <Button className="rounded-full bg-slate-50 text-neutral-800 w-[42px] h-[42px] text-[24px] p-0 border-transparent hover:bg-transparent hover:text-blue-500 transition ease-in-out duration-200 hover:scale-[1.2]">
            <AiOutlineShareAlt />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-fit p-6">
            <div className="flex flex-col gap-2">
              Share
              <a
                href={`https://www.facebook.com/dialog/share?app_id=87741124305&href=${url}&display=popup`}
              >
                <img
                  src="https://th.bing.com/th/id/OIP.CDaJK2XeVL95udO-fw0uKwHaHa?pid=ImgDet&rs=1"
                  className="w-[42px] h-[42px]"
                />
              </a>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              Sao chép địa chỉ liên kết
              <Snippet variant="bordered">{url}</Snippet>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
