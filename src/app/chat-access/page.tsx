"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ShieldCheck, Send, Info } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export default function ChatAccess() {
  const [isVerified, setIsVerified] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  
  // Auth Store
  const { user } = useAuthStore();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-populate from URL and auto-verify for logged-in users
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('bookingId');
    if (id) {
      setBookingId(id);
      if (user) {
        setIsVerified(true);
      }
    }
  }, [user]);

  // Fetch messages from API
  const fetchMessages = async () => {
    if (!bookingId) return;
    try {
      const res = await fetch(`/api/chat?bookingId=${bookingId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  // Poll for messages every 5 seconds (Simple "real-time" for this demo)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerified && bookingId) {
      fetchMessages();
      interval = setInterval(fetchMessages, 5000);
    }
    return () => clearInterval(interval);
  }, [isVerified, bookingId]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingId && email) {
      setIsVerified(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !bookingId) return;

    const tempMsg = {
      content: newMessage,
      senderId: user?.id || "traveler-1",
      bookingId: bookingId,
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempMsg),
      });
      if (res.ok) {
        setNewMessage("");
        fetchMessages(); // Refresh immediately
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="bg-[#001F54] p-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
            <MessageSquare size={48} className="mx-auto mb-4 text-[#FFD700] relative z-10" />
            <h1 className="text-2xl font-bold relative z-10">{user?.role === 'GUIDE' ? 'Guide Portal' : 'Traveler Portal'}</h1>
            <p className="text-blue-200 mt-2 text-sm relative z-10">Access your secure communications</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Booking ID</label>
                <input 
                  required 
                  type="text" 
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="e.g. GL-XYZ123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all font-mono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="used during checkout"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#001F54] outline-none transition-all"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
                <Info size={20} className="text-[#001F54] shrink-0 mt-0.5" />
                <p className="text-xs text-[#001F54]">You can find your Booking ID on the Traveler Pass generated after checkout or in your confirmation email.</p>
              </div>

              <button type="submit" className="w-full bg-[#001F54] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-md">
                Access Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row overflow-hidden h-[800px] max-h-[85vh]">
        
        {/* Chat Sidebar Info */}
        <div className="w-full md:w-80 bg-gray-50 border-r border-gray-100 flex flex-col hidden md:flex">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h2 className="font-bold text-gray-900 text-lg">Your Trip Details</h2>
            <div className="text-sm text-gray-500 mt-1 font-mono">ID: {bookingId}</div>
          </div>
          
          <div className="p-6 flex-1">
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-sm mb-3">
                <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Guide" fill className="object-cover" />
              </div>
              <h3 className="font-bold text-xl text-[#001F54]">{user?.role === 'GUIDE' ? 'Traveler' : 'Ahmed R.'}</h3>
              <div className="flex items-center justify-center text-xs font-bold text-green-600 mt-1">
                <ShieldCheck size={14} className="mr-1" /> MGC-1002
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-3">
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Destination</div>
                <div className="font-medium text-gray-900">Zagora, Morocco</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Status</div>
                <div className="inline-flex px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">Confirmed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white relative">
          
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
            <div className="flex items-center gap-3 md:hidden">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Guide" fill className="object-cover" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Ahmed R.</div>
                <div className="text-xs text-green-600 flex items-center"><ShieldCheck size={12} className="mr-1"/> Verified Guide</div>
              </div>
            </div>
            <div className="hidden md:block font-bold text-lg text-[#001F54]">{user?.role === 'GUIDE' ? 'Chat with Traveler' : 'Chat with Ahmed'}</div>
            <button onClick={() => setIsVerified(false)} className="text-sm text-gray-500 hover:text-[#001F54] font-medium">Log out</button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">No messages yet. Start the conversation!</div>
            )}
            {messages.map((msg) => {
              const isMe = msg.senderId === (user?.id || "traveler-1");
              return (
                <div key={msg.id} className={`flex flex-col ${!isMe ? 'items-start' : 'items-end'}`}>
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {!isMe && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mb-1">
                        <Image src="https://i.pravatar.cc/150?u=guide" alt="Guide" fill className="object-cover" />
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl ${!isMe ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-none' : 'bg-[#001F54] text-white rounded-br-none shadow-md'}`}>
                      {msg.content}
                    </div>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${!isMe ? 'ml-10' : 'mr-2'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-[#001F54] focus:border-transparent rounded-full px-6 py-3 outline-none transition-all"
              />
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="bg-[#FFD700] text-[#001F54] p-3 rounded-full hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
              >
                <Send size={20} className="ml-1" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
