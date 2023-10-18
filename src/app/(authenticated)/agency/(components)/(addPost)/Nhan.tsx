import { NhanBaiVietConst } from '@/lib/constant';
import { getRequest } from '@/lib/fetch';
import { Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export const Nhan = () => {
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const [user, setUser] = React.useState(null);
  console.log('🚀 ~ file: Nhan.tsx:11 ~ Nhan ~ user:', user);
  const session = useSession();
  console.log('🚀 ~ file: Nhan.tsx:12 ~ Nhan ~ session:', session);

  const isTypeValid = selectedType.size > 0;

  useEffect(() => {
    const getUser = async () => {
      const res = await getRequest({
        endPoint: `/api/user?id=${session?.data?.user?.id}`,
      });
      setUser(res);
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="font-bold text-sm">Nhãn bài viết</div>
      <Select
        key={'nhan'}
        radius={'md'}
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
        className="max-w-xs lg:max-w-lg"
      >
        {NhanBaiVietConst?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.value.toString()}
          </SelectItem>
        ))}
      </Select>
      <div className="w-full h-full">
        {user ? (
          <div className=" mb-10 sm:max-w-lg ">
            <p>
              Bạn hiện có{' '}
              <span className="font-bold"> {user?.luotChuyenNghiep}</span> lượt
              đăng bài viết <span className="font-bold"> Nổi bật</span>.
            </p>
            <p>
              Bạn hiện có <span className="font-bold"> {user?.luotVip}</span>{' '}
              lượt đăng bài viết <span className="font-bold"> Yêu thích</span>.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
