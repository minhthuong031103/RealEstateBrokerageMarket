// import ConversationList from '@components/ConversationList';
import { getSession } from '@/lib/auth';
import dynamic from 'next/dynamic';
const ConversationList = dynamic(
  () => import('@/components/ConversationList'),
  { ssr: false }
);
export default async function layout({ children }) {
  const session = await getSession();
  console.log('🚀 ~ file: layout.tsx:11 ~ layout ~ session:', session);

  if (
    session?.user?.duyetKhachHang == 'da_duyet' ||
    session?.user?.duyetDoiTac == 'da_duyet'
  ) {
    return (
      <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        <ConversationList title="Messages" />
        <div className="w-full lg:w-[80%]">{children}</div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      Tài khoản của bạn cần được duyệt để sử dụng chức năng này
    </div>
  );
}
