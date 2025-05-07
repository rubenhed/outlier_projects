'use client';

import { useState } from 'react';
import { ArrowLeft, MoreVertical, SendHorizonal } from 'lucide-react';

type Message = { id: number; text: string; fromMe: boolean };
type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  messages: Message[];
};
type Views = 'list' | 'chat';

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Jane Doe',
    lastMessage: 'Doing great, thanks!',
    messages: [
      { id: 1, text: 'Hey! How are you?', fromMe: false },
      { id: 2, text: "I'm good, you?", fromMe: true },
      { id: 3, text: 'Doing great, thanks!', fromMe: false },
    ],
  },
  {
    id: 2,
    name: 'John Smith',
    lastMessage: "Let's meet tomorrow.",
    messages: [
      { id: 1, text: 'Are you free?', fromMe: true },
      { id: 2, text: "Let's meet tomorrow.", fromMe: false },
    ],
  },
];

const ChatList = ({
  chats,
  onOpenChat,
}: {
  chats: Chat[];
  onOpenChat: (id: number) => void;
}) => (
  <>
    <Header title="Messenger" />
    <div className="flex-1 overflow-y-auto bg-blue-50">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onOpenChat(chat.id)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-100 border-b"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-semibold">
              {chat.name[0]}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-800">
                {chat.name}
              </div>
              <div className="text-xs text-gray-600 truncate max-w-[180px]">
                {chat.lastMessage}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  </>
);

const ChatView = ({
  chat,
  onBack,
  input,
  onInputChange,
  onSend,
}: {
  chat: Chat;
  onBack: () => void;
  input: string;
  onInputChange: (text: string) => void;
  onSend: () => void;
}) => (
  <>
    <ChatHeader name={chat.name} onBack={onBack} />
    <div className="flex-1 bg-blue-50 px-3 py-2 space-y-2 overflow-y-auto">
      {chat.messages.map((msg) => (
        <MessageBubble key={msg.id} text={msg.text} fromMe={msg.fromMe} />
      ))}
    </div>
    <MessageInput value={input} onChange={onInputChange} onSend={onSend} />
  </>
);

const Header = ({ title }: { title: string }) => (
  <div className="p-4 text-lg font-semibold text-white bg-blue-600 shadow">
    {title}
  </div>
);

const ChatHeader = ({
  name,
  onBack,
}: {
  name: string;
  onBack: () => void;
}) => (
  <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white sticky top-0 z-10 shadow">
    <div className="flex items-center gap-2">
      <button onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div>
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-blue-100">Active now</div>
      </div>
    </div>
    <MoreVertical className="w-5 h-5" />
  </div>
);

const MessageBubble = ({
  text,
  fromMe,
}: {
  text: string;
  fromMe: boolean;
}) => (
  <div
    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
      fromMe
        ? 'ml-auto bg-blue-500 text-white'
        : 'mr-auto bg-white text-gray-800 shadow'
    }`}
  >
    {text}
  </div>
);

const MessageInput = ({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}) => (
  <div className="flex items-center p-3 border-t bg-white">
    <input
      type="text"
      placeholder="Type a message..."
      className="flex-1 text-sm p-2 rounded-full border bg-gray-100 outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSend()}
    />
    <button
      className="ml-2 text-blue-600"
      onClick={onSend}
      aria-label="Send message"
    >
      <SendHorizonal className="w-5 h-5" />
    </button>
  </div>
);

const App = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [view, setView] = useState<Views>('list');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [input, setInput] = useState('');

  const activeChat = chats.find((c) => c.id === activeChatId);

  const openChat = (id: number) => {
    setActiveChatId(id);
    setView('chat');
  };

  const goBack = () => {
    setView('list');
    setInput('');
  };

  const sendMessage = () => {
    if (!input.trim() || !activeChatId) return;
    const updatedChats = chats.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            lastMessage: input,
            messages: [
              ...chat.messages,
              { id: Date.now(), text: input, fromMe: true },
            ],
          }
        : chat
    );
    setChats(updatedChats);
    setInput('');
  };

  return (
    <div className="max-w-sm mx-auto h-[95vh] flex flex-col border shadow bg-white my-5">
      {view === 'list' ? (
        <ChatList chats={chats} onOpenChat={openChat} />
      ) : (
        <ChatView
          chat={activeChat!}
          onBack={goBack}
          input={input}
          onInputChange={setInput}
          onSend={sendMessage}
        />
      )}
    </div>
  );
};

export default App;
