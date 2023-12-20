// import ConversationList from '@components/ConversationList';
import { getSession } from '@/lib/auth';
import { getRequest } from '@/lib/fetch';
import dynamic from 'next/dynamic';
const ConversationList = dynamic(
  () => import('@/components/ConversationList'),
  { ssr: false }
);

export default async function layout({ children }) {
  const session = await getSession();
  const user = await getRequest({
    endPoint: '/api/user/status?userId=' + session?.user?.id,
  });

  if (user?.duyetKhachHang == 'da_duyet' || user?.duyetDoiTac == 'da_duyet') {
    return (
      <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        <ConversationList title="Messages" />
        <div className="w-full lg:w-[80%]">{children}</div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-800 text-center text-xl mt-6 gap-3">
      <img
        src="https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif"
        className="w-[360px] h-auto"
      />
      Tài khoản của bạn cần được duyệt để sử dụng chức năng này
    </div>
  );
}
