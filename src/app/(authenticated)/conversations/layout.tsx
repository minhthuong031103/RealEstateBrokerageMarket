// import ConversationList from '@components/ConversationList';
import dynamic from 'next/dynamic';
const ConversationList = dynamic(() => import('@components/ConversationList'), {
  ssr: false,
});
export default async function layout({ children }) {
  return (
    <div className="h-full w-full flex flex-row overflow-hidden">
      <ConversationList title="Messages" />
      <div className="w-full lg:w-[80%]">{children}</div>
    </div>
  );
}
