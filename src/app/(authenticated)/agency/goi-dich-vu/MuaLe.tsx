"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { MuaLeModal } from "./MuaLeModal";
import { useRouter } from "next/navigation";

export const MuaLe = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div>
      <Button
        className="border-1 border-red-400 text-red-400 bg-transparent hover:text-white hover:bg-red-400 w-32 mt-1"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Mua lẻ
      </Button>

      {isModalOpen ? (
        <MuaLeModal
          isChild={false}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          callback={() => {
            setIsModalOpen(false);
            router.refresh();
          }}
        />
      ) : null}
    </div>
  );
};
