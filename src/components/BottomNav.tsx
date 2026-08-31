import { motion } from 'framer-motion';
import { Compass, Search, MessageCircle, User, Plus } from 'lucide-react';

interface BottomNavProps {
  activeTab: number;
  onTabChange: (index: number) => void;
  unreadCount: number;
  trustScore: number;
  onPostClick: () => void;
}

const tabs = [
  { label: 'Home', icon: Compass },
  { label: 'Explore', icon: Search },
  { label: 'Post', icon: Plus, isFab: true },
  { label: 'Chat', icon: MessageCircle },
  { label: 'Profile', icon: User },
];

export default function BottomNav({ activeTab, onTabChange, unreadCount, trustScore, onPostClick }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[72px] glass-nav safe-area-bottom">
      <div className="h-full max-w-[430px] mx-auto flex items-center justify-around px-2 relative">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;

          if (tab.isFab) {
            return (
              <button
                key={index}
                onClick={onPostClick}
                className="relative -top-4 flex flex-col items-center gap-1"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-[#FF6B35] shadow-lg shadow-[#FF6B35]/30 flex items-center justify-center"
                  whileTap={{ scale: 0.92 }}
                  animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.div>
                <span className="text-[10px] font-medium text-white/60">Post</span>
              </button>
            );
          }

          const realIndex = index < 2 ? index : index - 1;

          return (
            <button
              key={index}
              onClick={() => onTabChange(index < 2 ? index : index - 1)}
              className="relative flex flex-col items-center gap-1 w-14 py-1"
            >
              <div className="relative">
                <motion.div
                  animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#FF6B35]' : 'text-white/50'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </motion.div>
                {index === 3 && unreadCount > 0 && (
                  <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] rounded-full bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {unreadCount}
                  </span>
                )}
                {index === 4 && isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full trust-ring" style={{ padding: '1px' }}>
                    <div className="w-full h-full rounded-full bg-[#1A2A3A]" />
                  </div>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-[#FF6B35]' : 'text-white/40'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute -bottom-0.5 w-6 h-0.5 rounded-full bg-[#FF6B35]"
                  layoutId="bottomNavIndicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
