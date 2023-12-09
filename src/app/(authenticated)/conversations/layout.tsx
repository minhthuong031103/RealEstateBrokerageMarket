// import ConversationList from '@components/ConversationList';
import ConversationList from "@/components/ConversationList";

export default async function layout({ children }) {
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      <ConversationList title="Messages" />
      <div className="w-full lg:w-[80%]">{children}</div>
    </div>
  );
}
