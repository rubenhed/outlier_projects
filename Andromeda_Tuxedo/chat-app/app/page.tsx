'use client';

import { useState } from 'react';

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
}

const App = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (!username.trim() || !message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      username,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex gap-6 h-[400px]">
        
        <div className="w-1/3 flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400">Chat App</h1>

          <input
            type="text"
            placeholder="Username"
            className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type a message..."
            className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition"
          >
            Send
          </button>
        </div>

        <div className="w-2/3 flex flex-col gap-4 max-h-96 overflow-y-auto">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400">Messages</h1>
          {messages.map((msg) => (
            <div key={msg.id} className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{msg.username}</span>
                <span className="text-xs text-gray-500 dark:text-gray-300">{msg.timestamp}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{msg.message}</p>
            </div>
          ))}
        </div>
        
      </div>
    </main>
  );
}

export default App;