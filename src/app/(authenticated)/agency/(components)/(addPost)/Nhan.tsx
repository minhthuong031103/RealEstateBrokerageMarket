import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { NhanBaiVietConst } from '@/lib/constant';
import { Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export const Nhan = ({ setIsMuaLeModalOpen, setNhan }) => {
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const session = useSession();
  useEffect(() => {
    if (selectedType.size > 0) {
      const phapLyValueArray = Array.from(selectedType);
      setNhan(phapLyValueArray?.[0]);
    }
  }, [selectedType]);
  const isTypeValid = selectedType.size > 0;
  const { queryUser } = useAuth();

  const { data: user } = queryUser(session);
  const disabledKeys = [];
  if (user?.luotChuyenNghiep <= 0) {
    disabledKeys.push('Yêu thích');
  }
  if (user?.luotVip <= 0) {
    disabledKeys.push('Nổi bật');
  }
  return (
    <div className="flex flex-col gap-y-3">
      <div className="font-bold text-sm">Nhãn bài viết</div>
      <Select
        key={'nhan'}
        radius={'sm'}
        disabledKeys={disabledKeys}
        variant="bordered"
        label="Nhãn"
        isInvalid={isTypeValid || !typeTouched ? false : true}
        errorMessage={
          isTypeValid || !typeTouched ? '' : 'Vui lòng chọn nhãn bài viết'
        }
        autoFocus={false}
        placeholder="Chọn nhãn bài viết"
        selectedKeys={selectedType}
        onSelectionChange={(keys) => {
          setSelectedType(keys);
        }}
        onClose={() => setTypeTouched(true)}
        className="w-full"
        defaultSelectedKeys={['Thông thường']}
      >
        {NhanBaiVietConst?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.value.toString()}
          </SelectItem>
        ))}
      </Select>
      <div className="w-full h-full">
        {user ? (
          <div className="text-sm mb-6 max-full">
            <p>
              Bạn hiện có{' '}
              <span className="font-semibold"> {user?.luotChuyenNghiep}</span>{' '}
              lượt đăng bài viết{' '}
              <span className="font-semibold"> Yêu thích</span>.
            </p>
            <p>
              Bạn hiện có{' '}
              <span className="font-semibold"> {user?.luotVip}</span> lượt đăng
              bài viết <span className="font-semibold"> Nổi bật</span>.
            </p>
            <Button
              onClick={() => {
                setIsMuaLeModalOpen(true);
              }}
              className="w-full mt-3 border-1 border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white font-semibold"
            >
              Mua ngay
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
