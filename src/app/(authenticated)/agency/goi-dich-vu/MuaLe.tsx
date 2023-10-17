'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { MuaLeModal } from './MuaLeModal';

export const MuaLe = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Mua lẻ
      </Button>

      {isModalOpen ? (
        <MuaLeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      ) : null}
    </div>
  );
};
