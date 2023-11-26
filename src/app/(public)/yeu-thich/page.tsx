import { redirect } from 'next/navigation';
import { LayoutBatDongSanYeuThich } from './(components)/LayoutBatDongSanYeuThich';
import { getSession } from '@/lib/auth';

async function page() {
  const session = await getSession();
  if (!session) redirect('/auth/login');
  return (
    <div className="container mx-auto lg:px-[52px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h2 className="text-gray-500">Trang chủ / Danh sách yêu thích</h2>
            <h1 className="text-[32px] text-neutral-700 font-semibold mt-4">
              Danh sách yêu thích của bạn
            </h1>
          </div>
          <LayoutBatDongSanYeuThich session={session} />
        </div>
      </div>
    </div>
  );
}

export default page;
