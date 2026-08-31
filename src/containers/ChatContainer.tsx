import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, MapPin, Camera, CheckCircle2, X, Shield, Lock, Mic, Volume2, ChevronLeft, Clock } from 'lucide-react';
import { chatThreads } from '../data/mockData';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  type: 'text' | 'location' | 'photo' | 'voice' | 'otp';
  duration?: number;
}

const mockMessages: Message[] = [
  { id: 'm1', text: 'Hey! I have reached the pickup point near the main gate.', sender: 'them', timestamp: '10:23 AM', type: 'text' },
  { id: 'm2', text: 'Great, I am on my way. Should be there in 5 minutes.', sender: 'me', timestamp: '10:24 AM', type: 'text' },
  { id: 'm3', text: 'I have dropped the package at the hotel reception. Here is the QR code.', sender: 'them', timestamp: '10:45 AM', type: 'text' },
  { id: 'm4', text: 'Package photo attached', sender: 'them', timestamp: '10:45 AM', type: 'photo' },
  { id: 'm5', text: '2:34', sender: 'them', timestamp: '10:46 AM', type: 'voice', duration: 154 },
];

export default function ChatContainer() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpDigits] = useState(['4', '2', '8', '1']);

  const chat = chatThreads.find((c) => c.id === selectedChat);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'In Progress' },
    completed: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Completed' },
    pending: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' },
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-4 pb-6">
      {!selectedChat ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-[#1A1A2E]">Inbox</h2>
            <span className="text-xs font-mono text-[#9A9A9E]">{chatThreads.length} chats</span>
          </div>
          {chatThreads.map((thread, i) => {
            const status = statusColors[thread.deliveryStatus];
            return (
              <motion.button
                key={thread.id}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#E5E2DE] text-left flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                onClick={() => setSelectedChat(thread.id)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative shrink-0">
                  <img src={thread.avatar} alt={thread.name} className="w-12 h-12 rounded-full object-cover" />
                  {thread.deliveryStatus === 'active' && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00C9A7] border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1A1A2E]">{thread.name}</p>
                    <span className="text-[10px] font-mono text-[#9A9A9E] shrink-0">{thread.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#5A5A6E] mt-0.5 truncate">{thread.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text}`}>
                      {status.label}
                    </div>
                    {thread.unreadCount > 0 && (
                      <span className="min-w-[18px] h-[18px] rounded-full bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center px-1">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#E5E2DE] mb-3">
            <button onClick={() => { setSelectedChat(null); setMessages(mockMessages); setShowOtp(false); }} className="w-8 h-8 rounded-full bg-[#F0EDE9] flex items-center justify-center shrink-0">
              <ChevronLeft className="w-4 h-4 text-[#5A5A6E]" />
            </button>
            <img src={chat?.avatar} alt={chat?.name} className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A2E]">{chat?.name}</p>
              <p className="text-[10px] text-[#00C9A7]">Online</p>
            </div>
            <div className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">
              Active
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-3">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * i }}
              >
                {msg.type === 'text' && (
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.sender === 'me' ? 'bg-[#FF6B35] text-white rounded-br-md' : 'bg-[#F0EDE9] text-[#1A1A2E] rounded-bl-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-white/60' : 'text-[#9A9A9E]'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                )}
                {msg.type === 'photo' && (
                  <div className="max-w-[75%] rounded-2xl bg-[#F0EDE9] p-2 rounded-bl-md">
                    <div className="w-48 h-32 bg-[#E5E2DE] rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-[#9A9A9E]" />
                    </div>
                    <p className="text-[10px] text-[#9A9A9E] mt-1 text-right">{msg.timestamp}</p>
                  </div>
                )}
                {msg.type === 'voice' && (
                  <div className="max-w-[75%] rounded-2xl bg-[#F0EDE9] p-3 rounded-bl-md flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-6 flex items-end gap-[2px]">
                        {Array.from({ length: 20 }).map((_, j) => (
                          <div
                            key={j}
                            className="w-[2px] rounded-full bg-[#FF6B35]/40"
                            style={{ height: `${Math.random() * 20 + 4}px` }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#5A5A6E]">{msg.duration}s</span>
                    <p className="text-[10px] text-[#9A9A9E] ml-2">{msg.timestamp}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 mb-2">
            <button className="w-9 h-9 rounded-full bg-[#F0EDE9] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#5A5A6E]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F0EDE9] flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 text-[#5A5A6E]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F0EDE9] flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 text-[#5A5A6E]" />
            </button>
            <motion.button
              className="flex-1 py-2.5 rounded-xl bg-[#1A2A3A] text-white text-xs font-bold flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOtp(true)}
            >
              <Shield className="w-4 h-4" />
              Mark as Collected
            </motion.button>
          </div>

          {/* OTP Verification */}
          <AnimatePresence>
            {showOtp && (
              <motion.div
                className="bg-[#F0EDE9] rounded-2xl p-4 mb-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-sm font-bold text-[#1A1A2E]">2FA Verification</span>
                  </div>
                  <button onClick={() => setShowOtp(false)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <X className="w-3 h-3 text-[#5A5A6E]" />
                  </button>
                </div>
                <p className="text-xs text-[#5A5A6E] mb-3">Enter the 4-digit code shared by the traveler to confirm handover.</p>
                <div className="flex items-center gap-3 justify-center mb-3">
                  {otpDigits.map((digit, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-[#FF6B35] flex items-center justify-center text-lg font-mono font-bold text-[#1A1A2E]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {digit}
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-3 h-3 text-[#9A9A9E]" />
                  <span className="text-xs font-mono text-[#9A9A9E]">Expires in 2:45</span>
                </div>
                <button className="w-full mt-3 py-2.5 rounded-xl bg-[#00C9A7] text-white text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Verify & Complete
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="flex items-center gap-2 bg-white rounded-2xl p-2 border border-[#E5E2DE]">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-[#1A1A2E] focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
