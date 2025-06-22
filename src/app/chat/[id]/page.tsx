'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { sampleDrones } from '@/data/drones';
import Image from 'next/image';

// This is a mock chat page. In a real application, you would fetch
// chat history and handle real-time messaging via a backend service.

export default function ChatPage() {
  const params = useParams();
  const droneId = params.id as string;
  const drone = sampleDrones.find(d => d.id === parseInt(droneId, 10));

  const [messages, setMessages] = useState([
    { id: 1, text: `안녕하세요! '${drone?.name}' 드론에 대해 문의드립니다.`, sender: 'me' },
    { id: 2, text: '네, 안녕하세요! 무엇이 궁금하신가요?', sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate a reply from the other user
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        text: '확인 후 답변드리겠습니다. 잠시만 기다려주세요.',
        sender: 'other',
      };
      setMessages(prevMessages => [...prevMessages, replyMsg]);
    }, 1500);
  };

  if (!drone) {
    return <div>판매 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex flex-col w-full max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <header className="flex items-center p-4 border-b">
          <Image
            src={drone.imageUrl}
            alt={drone.name}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{drone.name}</h2>
            <p className="text-sm text-gray-500">판매자: {drone.seller.name}</p>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'me'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 flex-shrink-0 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="메시지 전송"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
} 